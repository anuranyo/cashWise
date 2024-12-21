import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import { Asset } from "expo-asset";

const PdfView = ({ uri }: { uri: string }) => {
  // Resolve the local PDF URI
  const pdfUri = Asset.fromModule(uri).uri;

  return (
    <WebView
      source={{ uri: pdfUri }}
      style={styles.webview}
      javaScriptEnabled
      domStorageEnabled
    />
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default PdfView;
