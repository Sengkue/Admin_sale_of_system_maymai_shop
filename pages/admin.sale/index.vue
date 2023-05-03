<template>
    <div>
        <v-row justify="center" class="mb-3">
            <h1 class="grey lighten-5 mt-2">ຟອນຂາຍສິນຄ້າ</h1>
        </v-row>
        <v-divider></v-divider>
        <v-stepper v-model="e1" >
            <v-stepper-header>
                <v-divider></v-divider>
                <template>
                    <v-stepper-step 
                    dense flat
                     :key="`${n}-step`" 
                     :complete="e1 >
                        n" :step="n" editable>
                        <h2 v-if="n == 1">ເລືອກສິນຄ້າ</h2>
                        <h2 v-if="n == 1">ສິນຄ້າທີຕ້ອງງການ</h2>
                    </v-stepper-step>
                    <v-divider v-if="n !== steps" :key="n"></v-divider>
                </template>
            </v-stepper-header>
        </v-stepper>
       
    </div>
</template>
<script>
export default {
    data() {
        return {
            e1: 1,
            steps: 2,
            keymodel: '',
            
        }
    },

}

</script>


