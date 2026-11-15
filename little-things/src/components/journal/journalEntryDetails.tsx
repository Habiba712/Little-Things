

import { View, Text, StyleSheet, Image, Pressable, TextInput, ImageURISource, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import { Spacing } from '@/constants/theme';
import { Fonts } from '@/constants/theme';

import CoffeeIcon from '@/assets/images/hot.svg';
import MusicIcon from '@/assets/images/music.svg';
import CookiesIcon from '@/assets/images/cookies.svg';
import GalleryIcon from '@/assets/images/gallery.svg';
import FavoriteIcon from '@/assets/images/favorite.svg';
import BookIcon from '@/assets/images/book.svg';
import {
  JournalEntryDeleteModal,
  JournalEntryEditorModal,
  JournalForm,
} from '@/components/journal/journalEntryActions';

const getDisplayDate = (entry: any) => {
  const date = entry?.genericDate ?? entry?.createdAt;
  return date ? new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }) : '';
};

export default function JournalEntryDetails(
  {
    items,
    onBack,
    onEntryUpdated,
    onEntryDeleted,
  }:
    {
      items: any[],
      onBack(): void,
      onEntryUpdated?: (entry: any) => void,
      onEntryDeleted?: (id: string) => void,
    }
) {
  const [visibleItems, setVisibleItems] = useState<any[]>(items);
  const [actionEntry, setActionEntry] = useState<any | null>(null);
  const [editEntry, setEditEntry] = useState<any | null>(null);
  const [selectedDeleteEntry, setSelectedDeleteEntry] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    setVisibleItems(items);
  }, [items]);

  const updateEntry = async (form: JournalForm) => {
    if (!editEntry || !form.name.trim()) return;

    setUpdateError(null);
    setSaving(true);
    try {
      const token = SecureStore.getItem('token');
      const response = await fetch(`${process.env.EXPO_PUBLIC_ADDRESS_IP}/api/journal-entries/${editEntry._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message ?? 'Could not update journal entry');

      setVisibleItems((current) => current.map((item) => item._id === data.entry._id ? data.entry : item));
      onEntryUpdated?.(data.entry);
      setEditEntry(null);
      setActionEntry(null);
    } catch (error) {
      setUpdateError(error instanceof Error ? error.message : 'Could not update journal entry');
      console.error('Could not update journal entry', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEntry = async () => {
    if (!selectedDeleteEntry) return;

    setDeleteError(null);
    setDeleting(true);
    try {
      const token = SecureStore.getItem('token');
      const response = await fetch(`${process.env.EXPO_PUBLIC_ADDRESS_IP}/api/journal-entries/${selectedDeleteEntry._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.message ?? 'Could not delete journal entry');
      }

      const deletedId = selectedDeleteEntry._id;
      setVisibleItems((current) => current.filter((item) => item._id !== deletedId));
      onEntryDeleted?.(deletedId);
      setSelectedDeleteEntry(null);
      setActionEntry(null);
      if (visibleItems.length <= 1) onBack();
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Could not delete journal entry');
      console.error('Could not delete journal entry', error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <SafeAreaView>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color="#171616"
        />
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
      <View style={styles.entriesContainer}>
        <Text style={styles.header}>
          {items[0] ? getDisplayDate(items[0]) : ''}
        </Text>
        {visibleItems.map((item) => (
          <View key={item._id} style={styles.entryContainer}>
            <Pressable style={styles.closeButton} onPress={() => setActionEntry(actionEntry?._id === item._id ? null : item)}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#eccdbc"
              />
            </Pressable>
            {actionEntry?._id === item._id && (
              <View style={styles.actionMenu}>
                     <Pressable style={styles.menuButton} onPress={() => { setActionEntry(null); setUpdateError(null); setEditEntry(item); }}>
                  <Text style={styles.menuText}>Edit</Text>
                </Pressable>
                     <Pressable style={styles.menuDeleteButton} onPress={() => { setActionEntry(null); setDeleteError(null); setSelectedDeleteEntry(item); }}>
                  <Text style={styles.menuDeleteText}>Delete</Text>
                </Pressable>
              </View>
            )}

            <View style={styles.iconContainer}>
              {item.catName === 'Coffee' ? (
                <View >
                  <CoffeeIcon width={30} height={30} style={styles.iconBox} />

                </View>
              ) : item.catName === 'Books' ? (

                <View style={styles.iconBox}><BookIcon width={30} height={30} /></View>
              ) :
                item.catName === 'Songs' ? (
                  <View style={styles.iconBox}><MusicIcon width={30} height={30} /></View>
                ) :
                  item.catName === 'Tiny Treats' ? (
                    <View style={styles.iconBox}><CookiesIcon width={30} height={30} /></View>
                  ) :
                    item.catName === 'Moments' ? (
                      <View style={styles.iconBox}><GalleryIcon width={30} height={30} /></View>

                    ) :
                      item.catName === 'Favorites' ? (
                        <View style={styles.iconBox}><FavoriteIcon width={30} height={30} /></View>
              ) :
null}
              <View>
                <Text style={styles.entryName}>{item.name}</Text>
                <Text style={styles.entryDetails}>{item.details}</Text>
                <Text style={styles.entryNote}>{item.note}</Text>
              </View>

            </View>


          </View>
        ))}
      </View>

      <JournalEntryEditorModal
        visible={editEntry !== null}
        entry={editEntry}
        saving={saving}
              error={updateError}
        onClose={() => setEditEntry(null)}
        onSave={updateEntry}
      />
      <JournalEntryDeleteModal
        visible={selectedDeleteEntry !== null}
        deleting={deleting}
              error={deleteError}
        onCancel={() => setSelectedDeleteEntry(null)}
        onConfirm={handleDeleteEntry}
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    fontFamily: Fonts.handMed,
    fontSize: 18,
    color: '#7A6555',
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'left',

  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: Fonts.handBold,


  },
  entriesContainer: {
    //  paddingVertical: Spacing.two,
    // borderTopWidth: 1,
    // borderColor: '#1d1b19',
    gap: Spacing.three,


  },
  entryContainer: {
    gap: Spacing.one,
    minHeight: 80,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderWidth: 1,
    borderColor: '#D4C0A8',
    backgroundColor: '#FDF7EE',
    borderRadius: 15,


  },
  entryName: {
    fontSize: 18,
    color: "#2C1A10",
    fontFamily: Fonts.handBold
  },
  entryDetails: {
    fontSize: 11.5,
    fontWeight: 400
  },
  entryNote: {
    fontSize: 11.5,
    fontWeight: 400,
    color: '#5f3b21',
    fontFamily: Fonts.hand,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
  },
  iconBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5ecd7',
    borderRadius: 25,
    width: 50,
    height: 50,
    padding: 10
  },
  closeButton: {
    position: 'absolute',

    top: 0,
    right: 8,
  },
  actionMenu: {
    position: 'absolute',
    top: 28,
    right: 8,
    zIndex: 2,
    padding: Spacing.one,
    borderRadius: 10,
    backgroundColor: '#FFF9F3',
    borderWidth: 1,
    borderColor: '#D4C0A8',
  },
  menuButton: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  menuDeleteButton: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderTopWidth: 1,
    borderTopColor: '#E6D8C9',
  },
  menuText: {
    color: '#5F3B21',
    fontFamily: Fonts.handBold,
  },
  menuDeleteText: {
    color: '#A65742',
    fontFamily: Fonts.handBold,
  },
  closeIcon: {
    color: '#8f8080e1',

  }
})
