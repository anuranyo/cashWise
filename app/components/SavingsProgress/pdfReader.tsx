import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";

type Props = {
  uri: string;
};

type State = {
  pdfUri: string | null;
  isLoading: boolean;
};

class PdfReader extends Component<Props, State> {
  state: State = {
    pdfUri: null,
    isLoading: true,
  };

  componentDidMount() {
    this.loadPdf();
  }

  async loadPdf() {
    try {
      const localUri = FileSystem.documentDirectory + "TermsAndConditions.pdf";

      // Check if the file exists locally
      const fileInfo = await FileSystem.getInfoAsync(localUri);
      if (!fileInfo.exists) {
        console.log("Downloading PDF...");
        await FileSystem.downloadAsync(this.props.uri, localUri);
      }

      this.setState({ pdfUri: localUri, isLoading: false });
    } catch (error) {
      console.error("Error loading PDF:", error);
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { pdfUri, isLoading } = this.state;

    if (isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#00C9A7" />
        </View>
      );
    }

    if (!pdfUri) {
      return (
        <View style={styles.error}>
          <Text>Failed to load PDF. Please try again.</Text>
        </View>
      );
    }

    return <WebView source={{ uri: pdfUri }} style={styles.webView} />;
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  webView: {
    flex: 1,
  },
});

export default PdfReader;
