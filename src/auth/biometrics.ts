import { Platform } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

import {
  authenticateWithWebAuthn,
  getWebAuthnCapability,
} from "./webAuthn";

/** Face / fingerprint gate on native apps and web (WebAuthn). */
export function isBiometricGateEnabled(): boolean {
  return (
    Platform.OS === "ios" ||
    Platform.OS === "android" ||
    Platform.OS === "web"
  );
}

/** @deprecated use isBiometricGateEnabled */
export function isNativeBiometricGate(): boolean {
  return Platform.OS === "ios" || Platform.OS === "android";
}

export type BiometricCapability =
  | { ok: true; label: string }
  | { ok: false; message: string };

/**
 * Device must support user-verifying biometrics (face / fingerprint).
 * Device PIN-only is not enough on native; WebAuthn requires UV platform authenticator.
 */
export async function getBiometricCapability(): Promise<BiometricCapability> {
  if (Platform.OS === "web") {
    return getWebAuthnCapability();
  }

  if (Platform.OS !== "ios" && Platform.OS !== "android") {
    return { ok: true, label: "" };
  }

  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) {
    return {
      ok: false,
      message:
        "この端末には顔または指紋の認証機能がありません。アプリを利用できません。",
    };
  }

  const enrolled = await LocalAuthentication.isEnrolledAsync();
  if (!enrolled) {
    return {
      ok: false,
      message:
        "顔または指紋が端末に登録されていません。OSの設定で登録してから再度お試しください。",
    };
  }

  const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
  const hasFace = types.includes(
    LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
  );
  const hasFingerprint = types.includes(
    LocalAuthentication.AuthenticationType.FINGERPRINT,
  );

  if (!hasFace && !hasFingerprint) {
    return {
      ok: false,
      message:
        "顔または指紋の認証に対応していません。アプリを利用できません。",
    };
  }

  const label =
    hasFace && hasFingerprint
      ? "顔または指紋"
      : hasFace
        ? "顔"
        : "指紋";

  return { ok: true, label };
}

export async function authenticateWithBiometrics(
  promptLabel: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  if (Platform.OS === "web") {
    return authenticateWithWebAuthn();
  }

  if (Platform.OS !== "ios" && Platform.OS !== "android") {
    return { ok: true };
  }

  const capability = await getBiometricCapability();
  if (!capability.ok) {
    return capability;
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: `${promptLabel}認証でログイン`,
    cancelLabel: "キャンセル",
    /** Reject device passcode fallback — face/fingerprint only. */
    disableDeviceFallback: true,
    biometricsSecurityLevel: "strong",
  });

  if (result.success) {
    return { ok: true };
  }

  if (result.error === "user_cancel" || result.error === "system_cancel") {
    return { ok: false, message: "認証がキャンセルされました。" };
  }
  if (result.error === "not_enrolled" || result.error === "passcode_not_set") {
    return {
      ok: false,
      message:
        "顔または指紋が利用できません。OSの設定を確認してください。",
    };
  }
  if (result.error === "lockout") {
    return {
      ok: false,
      message:
        "認証の試行回数が上限に達しました。しばらくしてから再度お試しください。",
    };
  }

  return {
    ok: false,
    message: "顔または指紋の認証に失敗しました。",
  };
}
