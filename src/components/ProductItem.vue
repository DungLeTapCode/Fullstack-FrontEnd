<template>
  
        <div class="new_products_item">
          <router-link :to="'/chi-tiet-san-pham/'+ products.id">
                    <img :src="products.imagePath" alt="">
                    <h5>{{products.name}} </h5>
                <div class="products_new_total">
                    <span>{{ formattedPrice }}</span>
                    <div class="star">
                        <i class="ri-star-s-fill"></i>
                        <span>5.0</span>
                    </div>
                </div>
                   
                </router-link>
            </div>

</template>

<script setup>
 import { defineProps, computed } from 'vue';

// Định nghĩa props
const props = defineProps({
  products: {
    type: Object,
    required: true,
  },
});

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(props.products.unitPrice);
});
</script>

<style lang="scss" scoped>

</style>