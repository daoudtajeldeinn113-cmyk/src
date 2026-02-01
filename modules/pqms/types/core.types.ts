// أنواع المواد
export type MaterialType = 
  | "api"
  | "excipient"
  | "finished";

// مصادر الدساتير
export type PharmacopoeiaType = 
  | "BP"
  | "USP"
  | "Ph.Eur.";

// حالة الاختبار
export type TestStatus = "pass" | "fail" | "pending";

// مواصفات المادة (واجهة)
export interface MaterialSpecification {
  id: string;
  testName: string;
  specification: string;
  result?: string;
  unit?: string;
  status: TestStatus;
}

// المادة الصيدلانية الأساسية
export interface PharmaceuticalMaterial {
  id: string;
  code: string;
  name: string;
  type: MaterialType;
  pharmacopoeia: PharmacopoeiaType;
  specifications: MaterialSpecification[];
  requiresMicrobiologicalTesting: boolean;
  storageConditions: string;
  status: 'released' | 'quarantined' | 'rejected';
}

// المنتج النهائي
export interface FinishedProduct extends PharmaceuticalMaterial {
  dosageForm: string;
  strength: string;
  packaging: string;
  batchSize: string;
  shelfLife: number; // بالأشهر
}
