import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";

export default function UploadScreen() {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [docType, setDocType] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<any[]>([]);
  const STORAGE_KEY = "uploadedFiles_v1";

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setFiles(parsed);
        }
      } catch (e) {
        console.error("[Upload] failed to load saved files", e);
      }
    })();
  }, []);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*", "application/msword"],
        copyToCacheDirectory: true,
      });

      const r: any = result;
      const asset = r.assets?.[0] ?? (r.uri ? r : null);
      if (asset) {
        const fileObj = {
          name: asset.name || asset.fileName || "unknown",
          uri: asset.uri,
          size: asset.size || 0,
          mimeType: asset.mimeType || asset.type || "application/octet-stream",
          pickedAt: Date.now(),
        };
        setSelectedFile(fileObj);

        try {
          const newFiles = [fileObj, ...files];
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFiles));
          setFiles(newFiles);
        } catch (e) {
          console.error("[Upload] error saving file", e);
        }
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const removeFile = async (idx: number) => {
    try {
      const newFiles = files.filter((_, i) => i !== idx);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFiles));
      setFiles(newFiles);
    } catch (e) {
      console.error("[Upload] error removing file", e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Document Upload</Text>
        <Text style={styles.headerSubtitle}>
          Upload required documents for your enrollment
        </Text>
      </View>

      {/* Upload Form */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upload New Document</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Document Type:</Text>
          <TextInput
            value={docType}
            onChangeText={setDocType}
            placeholder="e.g. High School Certificate"
            style={styles.input}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description (optional):</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Short description"
            style={[styles.input, styles.textArea]}
            multiline
          />
        </View>

        <View style={styles.formGroup}>
          <TouchableOpacity style={styles.browseBtn} onPress={pickDocument}>
            <View style={styles.browseBtn}>
              <Text style={styles.browseBtnText}>Browse Files</Text>
            </View>
            <Text style={styles.fileInfo}>
              Accepted: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
            </Text>
          </TouchableOpacity>
        </View>

        {selectedFile && (
          <View style={styles.filePreview}>
            <Text style={styles.fileName}>{selectedFile.name}</Text>
            <Text style={styles.fileSize}>
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </Text>
          </View>
        )}
      </View>

      {/* Recent Uploads */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Uploads</Text>
        <View style={styles.historyCard}>
          {files.length === 0 ? (
            <Text style={{ color: "#7f8c8d" }}>No uploaded files yet</Text>
          ) : (
            files.map((f, idx) => (
              <View style={styles.historyItem} key={`${f.uri ?? f.name}_${idx}`}>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyTitle}>{f.name}</Text>
                  <Text style={styles.historyMeta}>
                    {f.mimeType} • {new Date(f.pickedAt).toLocaleString()}
                  </Text>
                </View>
                <View style={[styles.statusBadge, styles.statusVerified]}>
                  <Text style={styles.statusBadgeText}>Saved</Text>
                </View>
                <TouchableOpacity style={styles.removeBtn} onPress={() => removeFile(idx)}>
                  <Text style={styles.removeBtnText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },
  header: { padding: 20, paddingTop: 30 },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "#2c3e50", marginBottom: 8 },
  headerSubtitle: { fontSize: 16, color: "#7f8c8d" },
  section: {
    backgroundColor: "white",
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: { fontSize: 20, fontWeight: "600", color: "#2c3e50", marginBottom: 16 },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 15, fontWeight: "600", color: "#2c3e50", marginBottom: 8 },
  pickerContainer: { borderWidth: 1, borderColor: "#bdc3c7", borderRadius: 6, overflow: "hidden" },
  input: { padding: 12, fontSize: 15, color: "#2c3e50", borderWidth: 1, borderColor: "#e6e9ec", borderRadius: 6 },
  textArea: { height: 100, textAlignVertical: "top" },
  browseBtn: { backgroundColor: "#3498db", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 6 },
  browseBtnText: { color: "white", fontSize: 14, fontWeight: "600" },
  fileInfo: { fontSize: 13, color: "#7f8c8d", marginTop: 12, textAlign: "center" },
  filePreview: { backgroundColor: "white", borderWidth: 1, borderColor: "#bdc3c7", borderRadius: 12, padding: 16, marginVertical: 20 },
  fileName: { fontSize: 15, fontWeight: "600", color: "#2c3e50", marginBottom: 4 },
  fileSize: { fontSize: 13, color: "#7f8c8d", marginBottom: 8 },
  historyCard: { gap: 12 },
  historyItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#ecf0f1" },
  historyInfo: { flex: 1 },
  historyTitle: { fontSize: 15, fontWeight: "500", color: "#2c3e50", marginBottom: 4 },
  historyMeta: { fontSize: 13, color: "#7f8c8d" },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  statusVerified: { backgroundColor: "#d1e7dd" },
  statusBadgeText: { fontSize: 12, fontWeight: "600", color: "#0f5132" },
  removeBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  removeBtnText: { fontSize: 18, color: "#7f8c8d" },
});
