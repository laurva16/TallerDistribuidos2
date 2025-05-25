<template>
  <div class="container">
    <h1>Lista de Tareas</h1>

    <input v-model="nuevaTarea" @keyup.enter="agregarTarea" placeholder="Agregar nueva tarea" />
    <button @click="agregarTarea">Agregar</button>

    <ul>
      <li v-for="(tarea, index) in tareas" :key="index">
        {{ tarea }}
        <button @click="eliminarTarea(index)">❌</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nuevaTarea: '',
      tareas: ['Aprender Vue', 'Practicar con ejemplos']
    }
  },
  methods: {
    agregarTarea() {
      if (this.nuevaTarea.trim() !== '') {
        this.tareas.push(this.nuevaTarea.trim())
        this.nuevaTarea = ''
      }
    },
    eliminarTarea(index) {
      this.tareas.splice(index, 1)
    }
  }
}
</script>

<style>
.container {
  max-width: 500px;
  margin: 50px auto;
  font-family: Arial, sans-serif;
}
input {
  padding: 8px;
  width: 70%;
}
button {
  margin-left: 8px;
}
li {
  margin-top: 10px;
}
</style>
