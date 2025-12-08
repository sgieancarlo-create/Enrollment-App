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

      // expo-document-picker may return { assets: [...] } or { uri/name/size }
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
        // persist into AsyncStorage and list
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

  const removeFile = () => {
    setSelectedFile(null);
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

      {/* Upload Requirements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upload Requirements</Text>
        <View style={styles.requirementsList}>
          <View style={[styles.requirementItem, styles.completed]}>
            <View style={[styles.checkMark, styles.checkMarkCompleted]}>
              <Text style={styles.checkMarkText}>✓</Text>
            </View>
            <View style={styles.requirementInfo}>
              <Text style={styles.requirementName}>
                High School Certificate
              </Text>
              <Text style={styles.requirementDate}>Uploaded: Nov 15</Text>
            </View>
          </View>

          <View style={[styles.requirementItem, styles.completed]}>
            <View style={[styles.checkMark, styles.checkMarkCompleted]}>
              <Text style={styles.checkMarkText}>✓</Text>
            </View>
            <View style={styles.requirementInfo}>
              <Text style={styles.requirementName}>ID Proof</Text>
              <Text style={styles.requirementDate}>Uploaded: Nov 18</Text>
            </View>
          </View>

          <View style={[styles.requirementItem, styles.completed]}>
            <View style={[styles.checkMark, styles.checkMarkCompleted]}>
              <Text style={styles.checkMarkText}>✓</Text>
            </View>
            <View style={styles.requirementInfo}>
              <Text style={styles.requirementName}>Character Certificate</Text>
              <Text style={styles.requirementDate}>Uploaded: Nov 20</Text>
            </View>
          </View>

          <View style={[styles.requirementItem, styles.pending]}>
            <View style={[styles.checkMark, styles.checkMarkPending]}>
              <Text style={styles.checkMarkTextPending}>○</Text>
            </View>
            <View style={styles.requirementInfo}>
              <Text style={styles.requirementName}>Medical Certificate</Text>
              <Text style={styles.requirementDate}>Required</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Upload Form */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upload New Document</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Document Type:</Text>
          <View style={styles.pickerContainer}>
            <TextInput
              style={styles.input}
              placeholder="Select Document Type"
              value={docType}
              onChangeText={setDocType}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description (Optional):</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter any additional details..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* File Upload Area */}
        {!selectedFile ? (
          <TouchableOpacity style={styles.uploadArea} onPress={pickDocument}>
            <Text style={styles.uploadIcon}>📤</Text>
            <Text style={styles.uploadText}>Tap to select your file</Text>
            <Text style={styles.uploadSubtext}>or</Text>
            <View style={styles.browseBtn}>
              <Text style={styles.browseBtnText}>Browse Files</Text>
            </View>
            <Text style={styles.fileInfo}>
              Accepted: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.filePreview}>
            <View style={styles.previewItem}>
              <Text style={styles.fileIcon}>📄</Text>
              <View style={styles.fileDetails}>
                <Text style={styles.fileName}>{selectedFile.name}</Text>
                <Text style={styles.fileSize}>
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: "100%" }]} />
                </View>
              </View>
              <TouchableOpacity style={styles.removeBtn} onPress={removeFile}>
                <Text style={styles.removeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Form Actions */}
        <View style={styles.formActions}>
          <TouchableOpacity style={styles.btnPrimary}>
            <Text style={styles.btnText}>Upload Document</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSecondary}>
            <Text style={styles.btnSecondaryText}>Clear Form</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Upload History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Uploads</Text>
        <View style={styles.historyCard}>
          {files.length === 0 ? (
            <Text style={{ color: "#7f8c8d" }}>No uploaded files yet</Text>
          ) : (
            files.map((f, idx) => (
              <View
                style={styles.historyItem}
                key={`${f.uri ?? f.name}_${idx}`}
              >
                <View style={styles.historyInfo}>
                  <Text style={styles.historyTitle}>{f.name}</Text>
                  <Text style={styles.historyMeta}>
                    {f.mimeType} • {new Date(f.pickedAt).toLocaleString()}
                  </Text>
                </View>
                <View style={[styles.statusBadge, styles.statusVerified]}>
                  <Text style={styles.statusBadgeText}>Saved</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  header: {
    padding: 20,
    paddingTop: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#7f8c8d",
  },
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 16,
  },
  requirementsList: {
    gap: 12,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  completed: {
    borderLeftColor: "#27ae60",
  },
  pending: {
    borderLeftColor: "#f39c12",
  },
  checkMark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkMarkCompleted: {
    backgroundColor: "#27ae60",
  },
  checkMarkPending: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#f39c12",
  },
  checkMarkText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  checkMarkTextPending: {
    color: "#f39c12",
    fontWeight: "bold",
    fontSize: 16,
  },
  requirementInfo: {
    flex: 1,
  },
  requirementName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2c3e50",
    marginBottom: 2,
  },
  requirementDate: {
    fontSize: 13,
    color: "#7f8c8d",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 6,
    overflow: "hidden",
  },
  input: {
    padding: 12,
    fontSize: 15,
    color: "#2c3e50",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 6,
  },
  uploadArea: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#bdc3c7",
    borderRadius: 12,
    padding: 40,
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    marginVertical: 20,
  },
  uploadIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
  },
  uploadSubtext: {
    fontSize: 14,
    color: "#7f8c8d",
    marginVertical: 8,
  },
  browseBtn: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginVertical: 8,
  },
  browseBtnText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  fileInfo: {
    fontSize: 13,
    color: "#7f8c8d",
    marginTop: 12,
    textAlign: "center",
  },
  filePreview: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
  },
  previewItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  fileIcon: {
    fontSize: 40,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 13,
    color: "#7f8c8d",
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#ecf0f1",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3498db",
  },
  removeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ecf0f1",
    alignItems: "center",
    justifyContent: "center",
  },
  removeBtnText: {
    fontSize: 18,
    color: "#7f8c8d",
  },
  formActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: "#3498db",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  btnSecondaryText: {
    color: "#2c3e50",
    fontSize: 16,
    fontWeight: "600",
  },
  historyCard: {
    gap: 12,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2c3e50",
    marginBottom: 4,
  },
  historyMeta: {
    fontSize: 13,
    color: "#7f8c8d",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusVerified: {
    backgroundColor: "#d1e7dd",
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0f5132",
  },
});
