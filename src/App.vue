<template>
    <div class="container mt-5">
        <div class="col-6 col-md-4 mx-auto d-flex">
            <div class="container">
                <div class="card p-3 bg-dark">
                    <div class="form-floating mb-3">
                        <input v-model="movie" type="text" class="form-control" id="addVideoInput" placeholder="Add to Movie">
                        <label for="addVideoInput">Movie</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="director" type="text" class="form-control" id="addDirector" placeholder="Add Director">
                        <label for="adddirector">Director</label>
                    </div>
                <button @click="addToPlaylist()" class="btn btn-primary">Add to Movie List</button>
                </div>
                <hr>
                <h4>MY MOVIE LIST</h4>
                <div v-for="(video, index) in videos" :key="video.movie" class="d-flex rounded border shadow mb-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Itunes-movie-app-icon.png" alt="movieIcon" style="width: 50px;">
                    <div class="w-100" style="bg-opacity-100 margin-left: 5px;">
                        <p class="fs-6 fw-bolder mb-0 bg-opacity-100">{{video.movie}}</p>
                        <p class="mb-0 bg-opacity-100">{{video.director}}</p>
                    </div>
                    <div class="container w-25 d-flex align-items-center p-0">
                        <button @click="removeVideo(index)" class="btn btn-danger btn-sm mx-auto">X</button> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from './firebase/index.js'
import { collection, getDocs, addDoc, query, onSnapshot} from 'firebase/firestore'

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "videos"));
  let videosTmp = []
  querySnapshot.forEach((doc) => {
    // doc.data is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    const video = {
      movie: doc.data().movie,
      director: doc.data().director
    }
    videosTmp.push(video)
  });
  videos.value = videosTmp;
})

const videos = ref([])
const movie = ref('')
const director = ref('')

// const addToPlaylist = () => {
//     if(movie.value != '' && director.value != '') {
//         const newvideo = {
//             movieName: movie.value,
//             directorName: director.value
//         }
//         videos.value.push(newvideo)
//         movie.value = ''
//         director.value = ''
//     }
// }

const removeVideo = (id) => {
    videos.value.splice(id,1)
}

onMounted (async () => {
const q = query(collection(db, "videos"));
const unsubscribe = onSnapshot(q,(querySnapshot) => {
  const videosTmp = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    const video = {

      id: doc.id,
      movie: doc.data().movie,
      director: doc.data().director
    }

    videosTmp.push(video)
  });

  videos.value = videosTmp
})
})

const addToPlaylist = async () => {
    if (movie.value != "" && director.value != "") {
      const docRef = await addDoc(collection(db, "videos"), {
        movie: movie.value,
        director: director.value
      })
      console.log(docRef.id)
      movie.value = ""
      director.value = ""
    }
  }

</script>
<style>
.body{
  background-color: rgb(126, 177, 216);
}
</style>