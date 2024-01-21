"use client";
import dynamic from "next/dynamic";
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
import { Document, Page, StyleSheet, View, Text } from "@react-pdf/renderer";

const MyDoc = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default function DownloadCase() {
  return (
    <button className="my-4 self-end rounded-md  px-2 py-2 text-sm text-white outline outline-1 outline-slate-400 hover:bg-gray-800">
      <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Scarica il PDF"
        }
      </PDFDownloadLink>
    </button>
  );
}
