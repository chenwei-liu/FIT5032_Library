<template>
  <div>
    <BookList></BookList>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>
    <br>
    <form @submit.prevent="updateBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="updateIsbn" id="isbn" required />
      </div>
      <div>
        <label for="name">New Name:</label>
        <input type="text" v-model="updateName" id="name" required />
      </div>
      <button type="submit">update Book</button>
    </form>
    <br>
    <form @submit.prevent="deleteBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="deleteISBN" id="isbn" required />
      </div>
      <button type="submit">delete Book</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import db from '../firebase/init.js'
import { collection, addDoc,updateDoc,query,where,getDocs,doc,deleteDoc } from 'firebase/firestore';

import BookList from '../components/BookList.vue';

const isbn = ref('');
const name = ref('');

const addBook = async () => {
    try {
    const isbnNumber = Number(isbn.value);
    if (isNaN(isbnNumber)) {
        alert('ISBN must be a valid number');
        return;
    }

    await addDoc(collection(db, 'books'), {
        isbn: isbnNumber,
        name: name.value
    });
    isbn.value = '';
    name.value = '';
    alert('Book added successfully!');
    } catch (error) {
        console.error('Error adding book: ', error);
    }
    };

const updateIsbn = ref('');
const updateName = ref('');

const updateBook = async () => {
    try {
        const isbnNumber = Number(updateIsbn.value);
        if (isNaN(isbnNumber)) {
            alert('ISBN must be a valid number');
            return;
        }

        const booksRef = collection(db, 'books');
        const q = query(booksRef, where('isbn', '==', isbnNumber));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            alert('No book found with the provided ISBN');
            return;
        }
        const bookDoc = querySnapshot.docs[0];
        const bookRef = doc(db, 'books', bookDoc.id);

        await updateDoc(bookRef, {
            name: updateName.value
        });

        updateIsbn.value = '';
        updateName.value = '';
        alert('Book updated successfully!');
    } catch (error) {
        console.error('Error updating book: ', error);
        alert('Failed to update book.');
    }
};

const deleteISBN = ref('')

const deleteBook = async () => {
  try {
    const isbnNumber = Number(deleteISBN.value);
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number');
      return;
    }

    const booksRef = collection(db, 'books');
    const q = query(booksRef, where('isbn', '==', isbnNumber));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert('No book found with the provided ISBN');
      return;
    }

    const bookDoc = querySnapshot.docs[0];
    await deleteDoc(doc(db, 'books', bookDoc.id));

    deleteISBN.value = '';
    alert('Book deleted successfully!');
  } catch (error) {
    console.error('Error deleting book: ', error);
    alert('Failed to delete book.');
  }
};


</script>