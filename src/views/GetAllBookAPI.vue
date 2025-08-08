<template>
  <div v-if="apiResponse" class="api-response">
    <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(false)
const error = ref(null)
const books = ref([])
const apiResponse = ref(null)

const getApiData = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('src/assets/json/authors.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    books.value = data.flatMap(author =>
      author.famousWorks.map(work => ({
        author: author.name,
        title: work.title,
        year: work.year
      }))
    )

  } catch (err) {
    error.value = `Error loading book data: ${err.message}`
    console.error('Error loading book data:', err)
  } finally {
    loading.value = false
  }

  apiResponse.value = {
    success: true,
    data: {
      totalBooks: books.value.length,
      books: books.value
    },
    timestamp: new Date().toISOString()
  }
}

onMounted(() => {
  getApiData()
})

</script>
