import { View, StyleSheet } from "react-native";

export default function PhoneFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.phoneFrame}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
    justifyContent: "center",
    alignItems: "center",
  },

  phoneFrame: {
    width: 390,
    height: 844,
    maxWidth: "95%",

    backgroundColor: "#FAFAFA",

    borderRadius: 40,

    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,

    elevation: 10,
  },
});