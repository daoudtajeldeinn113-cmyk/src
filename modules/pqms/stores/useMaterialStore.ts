import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { 
  PharmaceuticalMaterial, 
  FinishedProduct,
  MaterialSpecification 
} from '../types/core.types';

export const useMaterialStore = defineStore('pqms-materials', () => {
  // الحالة: المواد الخام والمنتجات النهائية
  const rawMaterials = ref<PharmaceuticalMaterial[]>([]);
  const finishedProducts = ref<FinishedProduct[]>([]);

  // الحسابات المباشرة
  const totalMaterials = computed(() => 
    rawMaterials.value.length + finishedProducts.value.length
  );

  const releasedMaterials = computed(() =>
    [...rawMaterials.value, ...finishedProducts.value]
      .filter(m => m.status === 'released').length
  );

  // الإجراءات الأساسية
  const addMaterial = (material: PharmaceuticalMaterial) => {
    rawMaterials.value.push(material);
  };

  const addFinishedProduct = (product: FinishedProduct) => {
    finishedProducts.value.push(product);
  };

  const getMaterialById = (id: string) => {
    const material = rawMaterials.value.find(m => m.id === id);
    if (material) return material;
    
    return finishedProducts.value.find(p => p.id === id);
  };

  return {
    // الحالة
    rawMaterials,
    finishedProducts,
    
    // الحسابات
    totalMaterials,
    releasedMaterials,
    
    // الإجراءات
    addMaterial,
    addFinishedProduct,
    getMaterialById
  };
});
