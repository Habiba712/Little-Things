import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Fonts, Spacing } from '@/constants/theme';

const CATEGORIES = ['Coffee', 'Books', 'Songs', 'Tiny Treats', 'Moments'];

export type JournalForm = {
  name: string;
  details: string;
  note: string;
  catName: string;
};

type EditorProps = {
  visible: boolean;
  entry: any | null;
  saving?: boolean;
  error?: string | null;
  onClose: () => void;
  onSave: (form: JournalForm) => void | Promise<void>;
};

export function JournalEntryEditorModal({
  visible,
  entry,
  saving = false,
  error = null,
  onClose,
  onSave,
}: EditorProps) {
  const [form, setForm] = useState<JournalForm>({ name: '', details: '', note: '', catName: '' });

  useEffect(() => {
    if (entry) {
      setForm({
        name: entry.name ?? '',
        details: entry.details ?? '',
        note: entry.note ?? '',
        catName: entry.catName ?? CATEGORIES[0],
      });
    }
  }, [entry]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>Edit your little thing</Text>
            <Pressable onPress={onClose} accessibilityLabel="Close edit modal">
              <Ionicons name="close" size={24} color="#5F3B21" />
            </Pressable>
          </View>

          <ScrollView keyboardShouldPersistTaps="handled">
            {error && <Text style={styles.errorText}>{error}</Text>}
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={form.name}
              placeholder="Give it a name"
              placeholderTextColor="#A88D79"
              onChangeText={(name) => setForm((current) => ({ ...current, name }))}
            />

            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
              {CATEGORIES.map((category) => (
                <Pressable
                  key={category}
                  style={[styles.categoryButton, form.catName === category && styles.categoryButtonSelected]}
                  onPress={() => setForm((current) => ({ ...current, catName: category }))}
                >
                  <Text style={[styles.categoryText, form.catName === category && styles.categoryTextSelected]}>
                    {category}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <Text style={styles.label}>Details</Text>
            <TextInput
              style={styles.input}
              value={form.details}
              placeholder="A few details"
              placeholderTextColor="#A88D79"
              onChangeText={(details) => setForm((current) => ({ ...current, details }))}
            />

            <Text style={styles.label}>Note</Text>
            <TextInput
              style={[styles.input, styles.noteInput]}
              value={form.note}
              placeholder="Write a little note..."
              placeholderTextColor="#A88D79"
              multiline
              onChangeText={(note) => setForm((current) => ({ ...current, note }))}
            />

            <Pressable
              style={[styles.saveButton, saving && styles.disabledButton]}
              disabled={saving}
              onPress={() => onSave(form)}
            >
              <Text style={styles.saveButtonText}>{saving ? 'Saving...' : 'Save changes ✨'}</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

type DeleteProps = {
  visible: boolean;
  deleting?: boolean;
  error?: string | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export function JournalEntryDeleteModal({ visible, deleting = false, error = null, onCancel, onConfirm }: DeleteProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.confirmCard}>
          <Text style={styles.title}>Let this one go?</Text>
          <Text style={styles.confirmText}>This journal entry will be removed permanently.</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={styles.confirmActions}>
            <Pressable style={styles.cancelButton} onPress={onCancel} disabled={deleting}>
              <Text style={styles.cancelText}>Keep it</Text>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={onConfirm} disabled={deleting}>
              <Text style={styles.deleteText}>{deleting ? 'Deleting...' : 'Delete'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.three,
    backgroundColor: 'rgba(44, 26, 16, 0.35)',
  },
  modalCard: {
    maxHeight: '88%',
    borderRadius: 22,
    padding: Spacing.four,
    backgroundColor: '#FDF7EE',
    borderWidth: 1,
    borderColor: '#D4C0A8',
  },
  confirmCard: {
    borderRadius: 22,
    padding: Spacing.four,
    backgroundColor: '#FDF7EE',
    borderWidth: 1,
    borderColor: '#D4C0A8',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.two,
  },
  title: {
    color: '#2C1A10',
    fontFamily: Fonts.handBold,
    fontSize: 24,
  },
  label: {
    color: '#7A6555',
    fontFamily: Fonts.handMed,
    fontSize: 16,
    marginTop: Spacing.two,
    marginBottom: Spacing.one,
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#D4C0A8',
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    color: '#2C1A10',
    backgroundColor: '#FFF9F3',
    fontFamily: Fonts.hand,
  },
  noteInput: {
    minHeight: 88,
    textAlignVertical: 'top',
  },
  categoryRow: {
    gap: Spacing.one,
    paddingVertical: Spacing.one,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: '#D4C0A8',
    borderRadius: 18,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    backgroundColor: '#FFF9F3',
  },
  categoryButtonSelected: {
    borderColor: '#705123',
    backgroundColor: '#705123',
  },
  categoryText: {
    color: '#7A6555',
    fontFamily: Fonts.hand,
  },
  categoryTextSelected: {
    color: '#FDF7EE',
  },
  saveButton: {
    alignItems: 'center',
    borderRadius: 14,
    marginTop: Spacing.four,
    paddingVertical: Spacing.two,
    backgroundColor: '#705123',
  },
  disabledButton: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#FDF7EE',
    fontFamily: Fonts.handBold,
    fontSize: 17,
  },
  confirmText: {
    color: '#7A6555',
    fontFamily: Fonts.hand,
    fontSize: 16,
    marginTop: Spacing.two,
  },
  errorText: {
    color: '#A65742',
    fontFamily: Fonts.handMed,
    marginTop: Spacing.two,
  },
  confirmActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.two,
    marginTop: Spacing.four,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#D4C0A8',
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  cancelText: {
    color: '#7A6555',
    fontFamily: Fonts.handBold,
  },
  deleteButton: {
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    backgroundColor: '#A65742',
  },
  deleteText: {
    color: '#FFF9F3',
    fontFamily: Fonts.handBold,
  },
});
