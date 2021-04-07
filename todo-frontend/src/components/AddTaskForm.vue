<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="700px"
      max-height="400px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
          class="btn "
          color="orange"
          dark
          v-bind="attrs"
          v-on="on"
          width="600"
          min-width="490"
          height="75"
        >
          <h1 class="add_task">Add Task</h1>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">New Task</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
                  label="Name of the Task"
                  v-model="name"
            ></v-text-field>
            <DateTimePicker @pushDate="getDate" @pushTime="getTime" />
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addTask"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import DateTimePicker from './DateTimePicker.vue'
  export default {
    components:{
      DateTimePicker,
    },
    data(){
      return{
        dialog: false,
        name: "",
        date: "",
        time: "",
      }
    },
    methods: {
      getTime(time){
        this.time = time;
      },
      getDate(date){
        this.date = date;
      },
      addTask(){
        this.$emit('addTask', { name: this.name, date: this.date, time: this.time });
        this.dialog = false;
        console.log(  { name: this.name, date: this.date, time: this.time } );
      },
      
    },
  }
</script>

<style scoped>
.add_task{
  font-weight: 400;
  color: rgb(46, 27, 16);
}
</style>