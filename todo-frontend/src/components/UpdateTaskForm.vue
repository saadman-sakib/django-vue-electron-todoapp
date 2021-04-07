<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="700px"
      max-height="400px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Update Task</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
                  label="Name of the Task"
                  v-model="name"
            ></v-text-field>
            <DateTimePicker :_date="date" :_time="time" @pushDate="getDate" @pushTime="getTime" />
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="updateTask"
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
      props: ['task'],
    components:{
      DateTimePicker,
    },
    data(){
      return{
        dialog: true,
        name: this.task.title,
        date: this.task.time.split("T")[0],
        time: this.task.time.split("T")[1].replace("Z",""),
      }
    },
    methods: {
      getTime(time){
        this.time = time;
      },
      getDate(date){
        this.date = date;
      },
      updateTask(){
        this.$emit('updateTask', { name: this.name, date: this.date, time: this.time });
        this.dialog = false;
        
      },
      close(){
          this.$emit('close')
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