import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppAuth } from "../auth/AppAuthContext";
import { defaultMatchBackground } from "../match-setup/backgrounds";
import { MatchScreenBackground } from "../match-setup/MatchScreenBackground";

export function LoginScreen() {
  const router = useRouter();
  const { login } = useAppAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const result = await login(email, password);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      router.replace("/");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MatchScreenBackground
      source={defaultMatchBackground}
      overlayColor="rgba(28, 36, 24, 0.35)"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.card}>
          <Text style={styles.kicker}>クローズド利用</Text>
          <Text style={styles.title}>ログイン</Text>
          <Text style={styles.lead}>
            発行されたメールアドレスとパスワードでログインしてください。新規登録はありません。
          </Text>

          <Text style={styles.label}>メールアドレス</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            editable={!submitting}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            textContentType="username"
            placeholder="メールアドレス"
            placeholderTextColor="#9a9286"
            style={styles.input}
          />

          <Text style={styles.label}>パスワード</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!submitting}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="password"
            textContentType="password"
            placeholder="パスワード"
            placeholderTextColor="#9a9286"
            onSubmitEditing={() => {
              void handleSubmit();
            }}
            style={styles.input}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            accessibilityRole="button"
            disabled={submitting}
            onPress={() => {
              void handleSubmit();
            }}
            style={({ pressed }) => [
              styles.primaryButton,
              submitting && styles.primaryButtonDisabled,
              pressed && !submitting && styles.primaryButtonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {submitting ? "確認中…" : "ログイン"}
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
