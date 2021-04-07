<template>
  <v-row class="form" >
    <v-col
      cols="11"
      sm="5"
    >
      <v-dialog
        ref="dialog1"
        v-model="modal2"
        :return-value.sync="time"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            label="time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="modal2"
          v-model="time"
          full-width
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal2 = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="pushTime"
          >
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>
    </v-col>
    <v-spacer></v-spacer>
    <v-col
      cols="11"
      sm="5"
    >
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="pushDate"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
  </v-row>
</template>


<script>
  export default {
    props:['_date', '_time'],
    data () {
      return {
        time: this._time,
        modal2: false,
        date: this._date,
        modal: false,
        }
    },
    methods: {
      pushTime(){
        this.$refs.dialog1.save(this.time);
        this.$emit('pushTime', this.time);
        this.modal2 = false;
      },
      pushDate(){
        this.$refs.dialog.save(this.date)
        this.$emit('pushDate', this.date);
        this.modal = false;
      }
    },
  }
</script>

<style scoped>
.form{
    height: 400px;
}
</style>