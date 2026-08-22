import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppAuth } from "../auth/AppAuthContext";
import {
  getBiometricCapability,
  type BiometricCapability,
} from "../auth/biometrics";
import { defaultMatchBackground } from "../match-setup/backgrounds";
import { MatchScreenBackground } from "../match-setup/MatchScreenBackground";

export function LoginScreen() {
  const router = useRouter();
  const { login, authRequired, biometricRequired } = useAppAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [biometricReady, setBiometricReady] = useState(!biometricRequired);
  const [biometricCapability, setBiometricCapability] =
    useState<BiometricCapability | null>(
      biometricRequired ? null : { ok: true, label: "" },
    );

  useEffect(() => {
    if (!biometricRequired) {
      setBiometricReady(true);
      setBiometricCapability({ ok: true, label: "" });
      return;
    }

    let cancelled = false;
    (async () => {
      const capability = await getBiometricCapability();
      if (cancelled) return;
      setBiometricCapability(capability);
      setBiometricReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [biometricRequired]);

  const biometricBlocked =
    biometricRequired && biometricCapability != null && !biometricCapability.ok;

  const handleSubmit = async () => {
    if (submitting || biometricBlocked) return;
    setError(null);
    setSubmitting(true);
    try {
      const result = await login(password);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      router.replace("/");
    } finally {
      setSubmitting(false);
    }
  };

  const leadText = (() => {
    if (!authRequired) {
      return "EXPO_PUBLIC_APP_PASSWORD が未設定のためゲートは無効です。.env にパスワードを入れて Expo を再起動してください。";
    }
    if (biometricRequired) {
      const label = biometricCapability?.ok
        ? biometricCapability.label
        : "顔または指紋";
      return `共有パスワードに加え、端末の${label}認証が必須です。認証できない場合は先の画面に進めません。新規登録はありません。`;
    }
    return "共有パスワードを入力してください。新規登録はありません。";
  })();

  return (
    <MatchScreenBackground
      source={defaultMatchBackground}
      overlayColor="rgba(28, 36, 24, 0.35)"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.card}>
          <Text style={styles.kicker}>クローズド利用</Text>
          <Text style={styles.title}>ログイン</Text>
          <Text style={styles.lead}>{leadText}</Text>

          {biometricRequired && !biometricReady ? (
            <View style={styles.biometricStatus}>
              <ActivityIndicator color="#1f6b4a" />
              <Text style={styles.biometricStatusText}>
                生体認証の利用可否を確認中…
              </Text>
            </View>
          ) : null}

          {biometricBlocked ? (
            <Text style={styles.blocker}>
              {biometricCapability && !biometricCapability.ok
                ? biometricCapability.message
                : "生体認証を利用できません。"}
            </Text>
          ) : null}

          <Text style={styles.label}>パスワード</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!biometricBlocked && !submitting}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="password"
            textContentType="password"
            placeholder="パスワード"
            placeholderTextColor="#9a9286"
            onSubmitEditing={() => {
              void handleSubmit();
            }}
            style={[
              styles.input,
              biometricBlocked && styles.inputDisabled,
            ]}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            accessibilityRole="button"
            disabled={
              biometricBlocked ||
              submitting ||
              (biometricRequired && !biometricReady)
            }
            onPress={() => {
              void handleSubmit();
            }}
            style={({ pressed }) => [
              styles.primaryButton,
              (biometricBlocked ||
                submitting ||
                (biometricRequired && !biometricReady)) &&
                styles.primaryButtonDisabled,
              pressed &&
                !biometricBlocked &&
                !submitting &&
                styles.primaryButtonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {submitting
                ? biometricRequired
                  ? "認証中…"
                  : "確認中…"
                : biometricRequired && biometricCapability?.ok
                  ? `${biometricCapability.label}認証して入る`
                  : "入る"}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </MatchScreenBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fffdf8",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    padding: 22,
    gap: 10,
  },
  kicker: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1f6b4a",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#1d1a16",
  },
  lead: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5c564c",
    lineHeight: 20,
    marginBottom: 6,
  },
  biometricStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 4,
  },
  biometricStatusText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5c564c",
  },
  blocker: {
    fontSize: 13,
    fontWeight: "700",
    color: "#a33b2a",
    lineHeight: 19,
    backgroundColor: "#fdeceb",
    borderRadius: 10,
    padding: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "800",
    color: "#5c564c",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 10,
    backgroundColor: "#fffdf8",
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#1d1a16",
  },
  inputDisabled: {
    backgroundColor: "#f0ebe3",
    color: "#9a9286",
  },
  error: {
    fontSize: 13,
    fontWeight: "700",
    color: "#a33b2a",
  },
  primaryButton: {
    marginTop: 8,
    backgroundColor: "#1f6b4a",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonDisabled: {
    backgroundColor: "#9bb5a8",
  },
  primaryButtonPressed: {
    opacity: 0.88,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fffdf8",
  },
});
