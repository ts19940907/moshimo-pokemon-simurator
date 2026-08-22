import { Platform } from "react-native";

const CREDENTIAL_ID_KEY = "moshimo.webAuthn.credentialId.v1";
const USER_ID_KEY = "moshimo.webAuthn.userId.v1";

export type WebAuthnCapability =
  | { ok: true; label: string }
  | { ok: false; message: string };

function isBrowserWeb(): boolean {
  return Platform.OS === "web" && typeof window !== "undefined";
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (let i = 0; i < view.length; i += 1) {
    binary += String.fromCharCode(view[i]!);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function randomBytes(size: number): Uint8Array<ArrayBuffer> {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return bytes;
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function readStoredCredentialId(): string | null {
  try {
    return window.localStorage.getItem(CREDENTIAL_ID_KEY);
  } catch {
    return null;
  }
}

function writeStoredCredentialId(id: string): void {
  try {
    window.localStorage.setItem(CREDENTIAL_ID_KEY, id);
  } catch {
    // ignore quota / private mode
  }
}

function getOrCreateUserId(): Uint8Array<ArrayBuffer> {
  try {
    const existing = window.localStorage.getItem(USER_ID_KEY);
    if (existing) return fromBase64Url(existing);
  } catch {
    // continue
  }
  const created = randomBytes(16);
  try {
    window.localStorage.setItem(USER_ID_KEY, toBase64Url(created));
  } catch {
    // ignore
  }
  return created;
}

function rpId(): string {
  return window.location.hostname;
}

/** WebAuthn platform authenticator (Touch ID / Windows Hello / phone biometrics). */
export async function getWebAuthnCapability(): Promise<WebAuthnCapability> {
  if (!isBrowserWeb()) {
    return { ok: true, label: "" };
  }

  if (!window.isSecureContext) {
    return {
      ok: false,
      message:
        "生体認証には HTTPS（または localhost）が必要です。安全な接続で開き直してください。",
    };
  }

  if (
    typeof window.PublicKeyCredential === "undefined" ||
    typeof navigator.credentials?.create !== "function" ||
    typeof navigator.credentials?.get !== "function"
  ) {
    return {
      ok: false,
      message:
        "このブラウザは指紋・顔などの生体認証（WebAuthn）に対応していません。アプリを利用できません。",
    };
  }

  try {
    const available =
      await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    if (!available) {
      return {
        ok: false,
        message:
          "この端末／ブラウザでは顔または指紋の認証を利用できません。OSで生体認証を有効にするか、対応ブラウザで開いてください。",
      };
    }
  } catch {
    return {
      ok: false,
      message:
        "生体認証の利用可否を確認できませんでした。対応ブラウザで開き直してください。",
    };
  }

  return { ok: true, label: "顔または指紋" };
}

async function registerPlatformCredential(): Promise<
  { ok: true } | { ok: false; message: string }
> {
  try {
    const credential = (await navigator.credentials.create({
      publicKey: {
        challenge: randomBytes(32),
        rp: {
          name: "もしもポケモンシミュレーター",
          id: rpId(),
        },
        user: {
          id: getOrCreateUserId(),
          name: "moshimo-app-user",
          displayName: "アプリ利用者",
        },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 },
          { type: "public-key", alg: -257 },
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
          residentKey: "preferred",
        },
        timeout: 60_000,
        attestation: "none",
      },
    })) as PublicKeyCredential | null;

    if (!credential) {
      return { ok: false, message: "生体認証の登録がキャンセルされました。" };
    }

    writeStoredCredentialId(toBase64Url(credential.rawId));
    return { ok: true };
  } catch (error) {
    return mapWebAuthnError(error, "登録");
  }
}

async function assertPlatformCredential(
  credentialId: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge: randomBytes(32),
        rpId: rpId(),
        allowCredentials: [
          {
            type: "public-key",
            id: fromBase64Url(credentialId),
            transports: ["internal"],
          },
        ],
        userVerification: "required",
        timeout: 60_000,
      },
    });

    if (!assertion) {
      return { ok: false, message: "生体認証がキャンセルされました。" };
    }
    return { ok: true };
  } catch (error) {
    return mapWebAuthnError(error, "認証");
  }
}

function mapWebAuthnError(
  error: unknown,
  action: "登録" | "認証",
): { ok: false; message: string } {
  const name =
    error && typeof error === "object" && "name" in error
      ? String((error as { name: string }).name)
      : "";

  if (name === "NotAllowedError") {
    return {
      ok: false,
      message: `生体認証の${action}がキャンセルされたか、拒否されました。`,
    };
  }
  if (name === "InvalidStateError") {
    return {
      ok: false,
      message:
        "この端末の認証情報と一致しません。ページを再読み込みしてから再度お試しください。",
    };
  }
  if (name === "NotSupportedError") {
    return {
      ok: false,
      message: "このブラウザでは生体認証を利用できません。",
    };
  }
  if (name === "SecurityError") {
    return {
      ok: false,
      message: "セキュアな接続でのみ生体認証を利用できます。",
    };
  }

  return {
    ok: false,
    message: `顔または指紋の${action}に失敗しました。`,
  };
}

/**
 * Password already verified. Register platform authenticator on first use,
 * then require biometric assertion on later logins in this browser.
 */
export async function authenticateWithWebAuthn(): Promise<
  { ok: true } | { ok: false; message: string }
> {
  if (!isBrowserWeb()) {
    return { ok: true };
  }

  const capability = await getWebAuthnCapability();
  if (!capability.ok) {
    return capability;
  }

  const existingId = readStoredCredentialId();
  if (existingId) {
    const asserted = await assertPlatformCredential(existingId);
    if (asserted.ok) return asserted;

    // Stale credential (OS reset, etc.) — clear and allow re-register once.
    try {
      window.localStorage.removeItem(CREDENTIAL_ID_KEY);
    } catch {
      // ignore
    }
  }

  return registerPlatformCredential();
}
