<template>
     <div class="admin_cardBox">
          <div class="admin_card" v-for="(card, index) in cardItems" :key="index">
            <div>
              <div class="admin_numbers">{{ card.numbers }}</div>
              <div class="admin_cardName">{{ card.cardName }}</div>
            </div>
            <div class="admin_iconBx">
              <ion-icon :name="card.icon"></ion-icon>
            </div>
          </div>
        </div>
</template>

<script setup>
import { ref } from 'vue';
 const cardItems = ref([
    { numbers: '1,504', cardName: 'Daily View', icon: 'cart-outline' },
    { numbers: '80', cardName: 'Sales', icon: 'bookmark-outline' },
    { numbers: '802', cardName: 'Comment', icon: 'chatbox-outline' },
    { numbers: '123,504,000', cardName: 'Doanh Thu', icon: 'cash-outline' },
  ]);

</script>

<style lang="scss" scoped>

</style>