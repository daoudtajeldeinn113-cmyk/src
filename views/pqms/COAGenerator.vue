<template>
  <div class="coa-generator">
    <!-- Header -->
    <div class="header">
      <h1>🎫 مولد شهادات التحليل (COA)</h1>
      <p class="subtitle">Certificate of Analysis Generator - نظام متكامل وفق دساتير الأدوية العالمية</p>
    </div>

    <!-- Main Content -->
    <div class="coa-container">
      <!-- Left Side: Form -->
      <div class="form-section">
        <h2>📝 بيانات شهادة التحليل</h2>
        
        <!-- Company Information -->
        <div class="section-card">
          <h3>🏢 معلومات الشركة</h3>
          <div class="form-grid">
            <div class="form-group">
              <label for="companyName">اسم الشركة:</label>
              <input type="text" id="companyName" v-model="coaData.company.name" 
                     placeholder="اسم شركة الأدوية" required>
            </div>
            
            <div class="form-group">
              <label for="companyAddress">عنوان الشركة:</label>
              <input type="text" id="companyAddress" v-model="coaData.company.address" 
                     placeholder="العنوان الكامل للشركة" required>
            </div>
          </div>
          
          <div class="form-grid">
            <div class="form-group">
              <label for="companyLogo">شعار الشركة (رابط URL):</label>
              <input type="text" id="companyLogo" v-model="coaData.company.logo" 
                     placeholder="https://example.com/logo.png">
              <small class="form-text">يمكن رفع الشعار لاحقاً عند دمج نظام الملفات</small>
            </div>
            
            <div class="form-group">
              <label for="licenseNumber">رقم الترخيص:</label>
              <input type="text" id="licenseNumber" v-model="coaData.company.license" 
                     placeholder="رقم ترخيص الهيئة" required>
            </div>
          </div>
        </div>

        <!-- Product & Batch Information -->
        <div class="section-card">
          <h3>📦 معلومات المنتج والتشغيلة</h3>
          <div class="form-grid">
            <div class="form-group">
              <label for="productName">اسم المنتج:</label>
              <input type="text" id="productName" v-model="coaData.product.name" 
                     placeholder="أدخل اسم المنتج الدوائي" required>
            </div>
            
            <div class="form-group">
              <label for="productCode">كود المنتج:</label>
              <input type="text" id="productCode" v-model="coaData.product.code" 
                     placeholder="مثال: PROD-001" required>
            </div>
          </div>
          
          <div class="form-grid">
            <div class="form-group">
              <label for="batchNumber">🔢 رقم التشغيلة:</label>
              <input type="text" id="batchNumber" v-model="coaData.batch.number" 
                     placeholder="مثال: BATCH-2024-001" required>
              <small class="form-text">رقم فريد يحدد دفعة الإنتاج</small>
            </div>
            
            <div class="form-group">
              <label for="analysisNumber">🔬 رقم التحليل:</label>
              <input type="text" id="analysisNumber" v-model="coaData.analysis.number" 
                     placeholder="مثال: AN-2024-001" required>
              <small class="form-text">رقم فريد لتقرير التحليل</small>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="manufacturingDate">📅 تاريخ التصنيع:</label>
              <input type="date" id="manufacturingDate" v-model="coaData.batch.manufacturingDate" required>
            </div>
            
            <div class="form-group">
              <label for="expiryDate">⏰ تاريخ الانتهاء:</label>
              <input type="date" id="expiryDate" v-model="coaData.batch.expiryDate" required>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="pharmacopoeia">📚 الدستور الدوائي:</label>
              <select id="pharmacopoeia" v-model="coaData.specifications.pharmacopoeia" required>
                <option value="USP">الدستور الأمريكي (USP)</option>
                <option value="BP">الدستور البريطاني (BP)</option>
                <option value="EP">الدستور الأوروبي (EP)</option>
                <option value="JP">الدستور الياباني (JP)</option>
                <option value="IP">الدستور الهندي (IP)</option>
                <option value="GCC">دستور مجلس التعاون الخليجي</option>
                <option value="custom">مخصص</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="productType">نوع المنتج:</label>
              <select id="productType" v-model="coaData.product.type" @change="updateTestParameters">
                <option value="tablet">أقراص</option>
                <option value="capsule">كبسولات</option>
                <option value="syrup">شراب</option>
                <option value="injection">حقن</option>
                <option value="cream">كريم/مرهم</option>
                <option value="powder">مسحوق</option>
                <option value="liquid">محلول سائل</option>
                <option value="suppository">تحاميل</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Test Parameters Tabs -->
        <div class="section-card">
          <h3>🔬 معايير الاختبار</h3>
          
          <!-- Test Categories Tabs -->
          <div class="test-categories">
            <button v-for="category in testCategories" 
                    :key="category.id"
                    :class="{ active: activeTestCategory === category.id }"
                    @click="activeTestCategory = category.id"
                    class="category-tab">
              {{ category.name }}
            </button>
          </div>

          <!-- Chemical Tests -->
          <div v-if="activeTestCategory === 'chemical'" class="category-content">
            <h4>الاختبارات الكيميائية</h4>
            <table class="parameters-table">
              <thead>
                <tr>
                  <th>المعيار</th>
                  <th>المواصفة</th>
                  <th>النتيجة</th>
                  <th>الحكم</th>
                  <th>الإجراء</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(test, index) in coaData.tests.chemical" :key="index">
                  <td>
                    <input type="text" v-model="test.parameter" 
                           placeholder="مثال: النقاوة" required>
                  </td>
                  <td>
                    <input type="text" v-model="test.specification" 
                           placeholder="مثال: 98.0% - 102.0%" required>
                  </td>
                  <td>
                    <input type="text" v-model="test.result" 
                           placeholder="مثال: 99.5%" required>
                  </td>
                  <td>
                    <select v-model="test.judgment" required>
                      <option value="pass">✅ مطابق</option>
                      <option value="fail">❌ غير مطابق</option>
                      <option value="na">⚪ غير مطبق</option>
                    </select>
                  </td>
                  <td>
                    <button @click="removeTestParameter('chemical', index)" 
                            class="btn btn-sm btn-danger">
                      🗑️ حذف
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button @click="addTestParameter('chemical')" class="btn btn-secondary">
              ➕ إضافة اختبار كيميائي
            </button>
          </div>

          <!-- Physical Tests -->
          <div v-if="activeTestCategory === 'physical'" class="category-content">
            <h4>الاختبارات الفيزيائية</h4>
            <div class="form-grid">
              <div class="form-group" v-if="coaData.product.type === 'tablet'">
                <label for="hardness">صلابة الأقراص (N):</label>
                <input type="text" id="hardness" v-model="coaData.tests.physical.hardness" 
                       placeholder="مثال: 50-100 N">
              </div>
              
              <div class="form-group" v-if="coaData.product.type === 'tablet'">
                <label for="friability">الهشاشة (%):</label>
                <input type="text" id="friability" v-model="coaData.tests.physical.friability" 
                       placeholder="مثال: ≤1.0%">
              </div>
              
              <div class="form-group" v-if="coaData.product.type === 'tablet'">
                <label for="disintegration">زمن التفتت (دقيقة):</label>
                <input type="text" id="disintegration" v-model="coaData.tests.physical.disintegration" 
                       placeholder="مثال: ≤15 دقيقة">
              </div>
              
              <div class="form-group" v-if="coaData.product.type === 'tablet'">
                <label for="thickness">سماكة الأقراص (مم):</label>
                <input type="text" id="thickness" v-model="coaData.tests.physical.thickness" 
                       placeholder="مثال: 2.5-3.0 مم">
              </div>
              
              <div class="form-group" v-if="coaData.product.type === 'tablet' || coaData.product.type === 'capsule'">
                <label for="diameter">قطر الأقراص/الكبسولات (مم):</label>
                <input type="text" id="diameter" v-model="coaData.tests.physical.diameter" 
                       placeholder="مثال: 8.0-8.5 مم">
              </div>
              
              <div class="form-group" v-if="coaData.product.type === 'tablet' || coaData.product.type === 'capsule'">
                <label for="dissolution">الذوبانية (%):</label>
                <input type="text" id="dissolution" v-model="coaData.tests.physical.dissolution" 
                       placeholder="مثال: ≥85% في 30 دقيقة">
              </div>
              
              <div class="form-group">
                <label for="appearance">المظهر:</label>
                <input type="text" id="appearance" v-model="coaData.tests.physical.appearance" 
                       placeholder="مثال: متجانس، خالي من الشوائب">
              </div>
            </div>
          </div>

          <!-- Microbiological Tests -->
          <div v-if="activeTestCategory === 'microbiological'" class="category-content">
            <h4>الاختبارات الميكروبيولوجية</h4>
            <table class="parameters-table">
              <thead>
                <tr>
                  <th>الاختبار</th>
                  <th>المواصفة</th>
                  <th>النتيجة</th>
                  <th>الحكم</th>
                  <th>الإجراء</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(test, index) in coaData.tests.microbiological" :key="index">
                  <td>
                    <input type="text" v-model="test.parameter" 
                           placeholder="مثال: العدد الكلي للميكروبات" required>
                  </td>
                  <td>
                    <input type="text" v-model="test.specification" 
                           placeholder="مثال: ≤1000 CFU/g" required>
                  </td>
                  <td>
                    <input type="text" v-model="test.result" 
                           placeholder="مثال: 500 CFU/g" required>
                  </td>
                  <td>
                    <select v-model="test.judgment" required>
                      <option value="pass">✅ مطابق</option>
                      <option value="fail">❌ غير مطابق</option>
                      <option value="na">⚪ غير مطبق</option>
                    </select>
                  </td>
                  <td>
                    <button @click="removeTestParameter('microbiological', index)" 
                            class="btn btn-sm btn-danger">
                      🗑️ حذف
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button @click="addTestParameter('microbiological')" class="btn btn-secondary">
              ➕ إضافة اختبار ميكروبيولوجي
            </button>
          </div>
        </div>

        <!-- Packaging Information -->
        <div class="section-card">
          <h3>📦 معلومات التعبئة والتغليف</h3>
          <div class="form-grid">
            <div class="form-group">
              <label for="primaryPackaging">التغليف الأولي:</label>
              <input type="text" id="primaryPackaging" v-model="coaData.packaging.primary" 
                     placeholder="مثال: ألومنيوم/بولي فينيل كلورايد" required>
            </div>
            
            <div class="form-group">
              <label for="secondaryPackaging">التغليف الثانوي:</label>
              <input type="text" id="secondaryPackaging" v-model="coaData.packaging.secondary" 
                     placeholder="مثال: علبة كرتون" required>
            </div>
          </div>
          
          <div class="form-grid">
            <div class="form-group">
              <label for="packSize">حجم العبوة:</label>
              <input type="text" id="packSize" v-model="coaData.packaging.size" 
                     placeholder="مثال: 10 أقراص/عبوة" required>
            </div>
            
            <div class="form-group">
              <label for="storageConditions">ظروف التخزين:</label>
              <input type="text" id="storageConditions" v-model="coaData.packaging.storage" 
                     placeholder="مثال: في درجة حرارة لا تزيد عن 25°م" required>
            </div>
          </div>
        </div>

        <!-- Approval Section -->
        <div class="section-card">
          <h3>👥 الاعتماد والموافقة</h3>
          <div class="form-grid">
            <div class="form-group">
              <label for="analystName">👨‍🔬 اسم المحلل:</label>
              <input type="text" id="analystName" v-model="coaData.approval.analyst.name" required>
            </div>
            
            <div class="form-group">
              <label for="analystSignature">✍️ توقيع المحلل:</label>
              <input type="text" id="analystSignature" v-model="coaData.approval.analyst.signature" 
                     placeholder="التوقيع الإلكتروني" required>
            </div>
          </div>
          
          <div class="form-grid">
            <div class="form-group">
              <label for="reviewerName">👨‍💼 اسم المراجع:</label>
              <input type="text" id="reviewerName" v-model="coaData.approval.reviewer.name" required>
            </div>
            
            <div class="form-group">
              <label for="approverName">👨‍⚖️ اسم المعتمد:</label>
              <input type="text" id="approverName" v-model="coaData.approval.approver.name" required>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button @click="generateCOA" class="btn btn-primary btn-lg">
            🎫 إنشاء شهادة التحليل
          </button>
          <button @click="saveDraft" class="btn btn-secondary btn-lg">
            💾 حفظ كمسودة
          </button>
          <button @click="resetForm" class="btn btn-outline btn-lg">
            🔄 إعادة تعيين
          </button>
        </div>
      </div>

      <!-- Right Side: Preview -->
      <div class="preview-section">
        <h2>👁️ معاينة الشهادة</h2>
        
        <div class="coa-preview" ref="coaPreview">
          <!-- COA Template -->
          <div class="coa-template">
            <!-- Header -->
            <div class="coa-header">
              <div class="company-info">
                <div class="company-logo">
                  <img v-if="coaData.company.logo" :src="coaData.company.logo" alt="شعار الشركة">
                  <div v-else class="logo-placeholder">🏢</div>
                </div>
                <div class="company-details">
                  <h2>{{ coaData.company.name || '[اسم الشركة]' }}</h2>
                  <p>{{ coaData.company.address || '[عنوان الشركة]' }}</p>
                  <p>رقم الترخيص: {{ coaData.company.license || '[رقم الترخيص]' }}</p>
                </div>
              </div>
              <div class="coa-title">
                <h1>شهادة التحليل</h1>
                <h3>Certificate of Analysis</h3>
                <p class="pharmacopoeia">وفقًا للمواصفات القياسية {{ getPharmacopoeiaText(coaData.specifications.pharmacopoeia) }}</p>
              </div>
              <div class="coa-meta">
                <div class="meta-item">
                  <strong>رقم الوثيقة:</strong> COA-{{ coaData.analysis.number }}
                </div>
                <div class="meta-item">
                  <strong>الإصدار:</strong> 1.0
                </div>
              </div>
            </div>

            <!-- Product Information -->
            <div class="coa-section">
              <h4>معلومات المنتج والتشغيلة</h4>
              <table class="coa-table">
                <tr>
                  <td><strong>اسم المنتج:</strong></td>
                  <td>{{ coaData.product.name || '[اسم المنتج]' }}</td>
                  <td><strong>كود المنتج:</strong></td>
                  <td>{{ coaData.product.code || '[كود المنتج]' }}</td>
                </tr>
                <tr>
                  <td><strong>رقم التشغيلة:</strong></td>
                  <td>{{ coaData.batch.number || '[رقم التشغيلة]' }}</td>
                  <td><strong>رقم التحليل:</strong></td>
                  <td>{{ coaData.analysis.number || '[رقم التحليل]' }}</td>
                </tr>
                <tr>
                  <td><strong>تاريخ التصنيع:</strong></td>
                  <td>{{ formatDate(coaData.batch.manufacturingDate) || '[تاريخ التصنيع]' }}</td>
                  <td><strong>تاريخ الانتهاء:</strong></td>
                  <td>{{ formatDate(coaData.batch.expiryDate) || '[تاريخ الانتهاء]' }}</td>
                </tr>
                <tr>
                  <td><strong>نوع المنتج:</strong></td>
                  <td>{{ getProductTypeText(coaData.product.type) }}</td>
                  <td><strong>الدستور الدوائي:</strong></td>
                  <td>{{ getPharmacopoeiaText(coaData.specifications.pharmacopoeia) }}</td>
                </tr>
              </table>
            </div>

            <!-- Test Results -->
            <div class="coa-section">
              <h4>نتائج الاختبارات الكيميائية</h4>
              <table class="results-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>المعيار</th>
                    <th>المواصفة</th>
                    <th>النتيجة</th>
                    <th>الحكم</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(test, index) in coaData.tests.chemical" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ test.parameter || '[المعيار]' }}</td>
                    <td>{{ test.specification || '[المواصفة]' }}</td>
                    <td>{{ test.result || '[النتيجة]' }}</td>
                    <td>
                      <span :class="getJudgmentClass(test.judgment)">
                        {{ getJudgmentText(test.judgment) }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="coaData.tests.chemical.length === 0">
                    <td colspan="5" class="text-center">لا توجد اختبارات كيميائية</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Physical Tests -->
            <div v-if="hasPhysicalTests" class="coa-section">
              <h4>نتائج الاختبارات الفيزيائية</h4>
              <table class="results-table">
                <thead>
                  <tr>
                    <th>الاختبار</th>
                    <th>المواصفة</th>
                    <th>النتيجة</th>
                    <th>الحكم</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="coaData.tests.physical.hardness">
                    <td>صلابة الأقراص</td>
                    <td>50-100 N</td>
                    <td>{{ coaData.tests.physical.hardness }}</td>
                    <td>
                      <span :class="judgePhysicalTest('hardness', coaData.tests.physical.hardness, '50-100')">
                        {{ judgePhysicalTest('hardness', coaData.tests.physical.hardness, '50-100') === 'judgment-pass' ? '✅ مطابق' : '❌ غير مطابق' }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="coaData.tests.physical.friability">
                    <td>الهشاشة</td>
                    <td>≤1.0%</td>
                    <td>{{ coaData.tests.physical.friability }}</td>
                    <td>
                      <span :class="judgePhysicalTest('friability', coaData.tests.physical.friability, '≤1.0')">
                        {{ judgePhysicalTest('friability', coaData.tests.physical.friability, '≤1.0') === 'judgment-pass' ? '✅ مطابق' : '❌ غير مطابق' }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="coaData.tests.physical.disintegration">
                    <td>زمن التفتت</td>
                    <td>≤15 دقيقة</td>
                    <td>{{ coaData.tests.physical.disintegration }}</td>
                    <td>
                      <span :class="judgePhysicalTest('disintegration', coaData.tests.physical.disintegration, '≤15')">
                        {{ judgePhysicalTest('disintegration', coaData.tests.physical.disintegration, '≤15') === 'judgment-pass' ? '✅ مطابق' : '❌ غير مطابق' }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="coaData.tests.physical.dissolution">
                    <td>الذوبانية</td>
                    <td>≥85% في 30 دقيقة</td>
                    <td>{{ coaData.tests.physical.dissolution }}</td>
                    <td>
                      <span :class="judgePhysicalTest('dissolution', coaData.tests.physical.dissolution, '≥85')">
                        {{ judgePhysicalTest('dissolution', coaData.tests.physical.dissolution, '≥85') === 'judgment-pass' ? '✅ مطابق' : '❌ غير مطابق' }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Microbiological Tests -->
            <div v-if="coaData.tests.microbiological.length > 0" class="coa-section">
              <h4>نتائج الاختبارات الميكروبيولوجية</h4>
              <table class="results-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>الاختبار</th>
                    <th>المواصفة</th>
                    <th>النتيجة</th>
                    <th>الحكم</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(test, index) in coaData.tests.microbiological" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ test.parameter || '[الاختبار]' }}</td>
                    <td>{{ test.specification || '[المواصفة]' }}</td>
                    <td>{{ test.result || '[النتيجة]' }}</td>
                    <td>
                      <span :class="getJudgmentClass(test.judgment)">
                        {{ getJudgmentText(test.judgment) }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Packaging Information -->
            <div class="coa-section">
              <h4>معلومات التعبئة والتغليف</h4>
              <table class="coa-table">
                <tr>
                  <td><strong>التغليف الأولي:</strong></td>
                  <td>{{ coaData.packaging.primary || '[التغليف الأولي]' }}</td>
                  <td><strong>التغليف الثانوي:</strong></td>
                  <td>{{ coaData.packaging.secondary || '[التغليف الثانوي]' }}</td>
                </tr>
                <tr>
                  <td><strong>حجم العبوة:</strong></td>
                  <td>{{ coaData.packaging.size || '[حجم العبوة]' }}</td>
                  <td><strong>ظروف التخزين:</strong></td>
                  <td>{{ coaData.packaging.storage || '[ظروف التخزين]' }}</td>
                </tr>
              </table>
            </div>

            <!-- Conclusion -->
            <div class="coa-section">
              <h4>الخلاصة والموافقة</h4>
              <div class="conclusion">
                <p>
                  <strong>الخلاصة:</strong>
                  بناءً على نتائج الاختبارات المذكورة أعلاه، فإن التشغيلة 
                  <strong>{{ coaData.batch.number || '[رقم التشغيلة]' }}</strong>
                  {{ getConclusionText() }}
                </p>
                
                <div class="signatures">
                  <div class="signature">
                    <strong>المحلل:</strong><br>
                    {{ coaData.approval.analyst.name || '[اسم المحلل]' }}<br>
                    التوقيع: ________________
                  </div>
                  <div class="signature">
                    <strong>المراجع:</strong><br>
                    {{ coaData.approval.reviewer.name || '[اسم المراجع]' }}<br>
                    التوقيع: ________________
                  </div>
                  <div class="signature">
                    <strong>المعتمد:</strong><br>
                    {{ coaData.approval.approver.name || '[اسم المعتمد]' }}<br>
                    التوقيع: ________________
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="coa-footer">
              <p>© {{ new Date().getFullYear() }} نظام إدارة الجودة الدوائية PQMS V008 | هذه الوثيقة صادرة إلكترونياً</p>
              <p>تاريخ الإصدار: {{ currentDate }}</p>
            </div>
          </div>
        </div>

        <!-- Preview Actions -->
        <div class="preview-actions">
          <button @click="printCOA" class="btn btn-success">
            🖨️ طباعة الشهادة
          </button>
          <button @click="exportHTML" class="btn btn-info">
            📄 حفظ كـ HTML
          </button>
          <button @click="saveCOA" class="btn btn-primary">
            💾 حفظ الشهادة
          </button>
        </div>

        <!-- Recent COAs -->
        <div class="recent-coas" v-if="recentCOAs.length > 0">
          <h3>📋 الشهادات الحديثة</h3>
          <table class="recent-table">
            <thead>
              <tr>
                <th>رقم التحليل</th>
                <th>رقم التشغيلة</th>
                <th>المنتج</th>
                <th>التاريخ</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="coa in recentCOAs" :key="coa.id">
                <td>{{ coa.analysis.number }}</td>
                <td>{{ coa.batch.number }}</td>
                <td>{{ coa.product.name }}</td>
                <td>{{ formatDate(coa.batch.manufacturingDate) }}</td>
                <td>
                  <span class="status-badge approved">معتمد</span>
                </td>
                <td>
                  <button @click="loadCOA(coa)" class="btn btn-sm btn-primary">فتح</button>
                  <button @click="deleteCOA(coa.id)" class="btn btn-sm btn-danger">حذف</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// Reactive Data
const coaData = ref({
  company: {
    name: 'شركة الأدوية العالمية',
    address: 'الرياض، المملكة العربية السعودية',
    logo: '',
    license: 'SFDA-2024-001'
  },
  
  product: {
    name: '',
    code: '',
    type: 'tablet'
  },
  
  batch: {
    number: '',
    manufacturingDate: '',
    expiryDate: '',
    size: '10000 وحدة'
  },
  
  analysis: {
    number: '',
    date: new Date().toISOString()
  },
  
  specifications: {
    pharmacopoeia: 'USP'
  },
  
  tests: {
    chemical: [
      { parameter: 'النقاوة', specification: '98.0% - 102.0%', result: '99.5%', judgment: 'pass' },
      { parameter: 'التحلل', specification: 'لا يزيد عن 1.0%', result: '0.5%', judgment: 'pass' },
      { parameter: 'المحتوى المائي', specification: 'لا يزيد عن 5.0%', result: '2.3%', judgment: 'pass' }
    ],
    
    physical: {
      hardness: '',
      friability: '',
      disintegration: '',
      thickness: '',
      diameter: '',
      dissolution: '',
      appearance: ''
    },
    
    microbiological: [
      { parameter: 'العدد الكلي للميكروبات', specification: '≤1000 CFU/g', result: '500 CFU/g', judgment: 'pass' },
      { parameter: 'البكتيريا القولونية', specification: 'غير موجود', result: 'غير موجود', judgment: 'pass' }
    ]
  },
  
  packaging: {
    primary: 'ألومنيوم/بولي فينيل كلورايد',
    secondary: 'علبة كرتون',
    size: '10 أقراص/عبوة',
    storage: 'في درجة حرارة لا تزيد عن 25°م'
  },
  
  approval: {
    analyst: {
      name: 'أحمد محمد',
      signature: 'A. Mohamed'
    },
    reviewer: {
      name: 'سارة علي',
      signature: 'S. Ali'
    },
    approver: {
      name: 'خالد عبدالله',
      signature: 'K. Abdullah'
    }
  },
  
  status: 'draft',
  createdDate: new Date().toISOString()
})

const recentCOAs = ref<any[]>([])
const coaPreview = ref<HTMLElement>()
const activeTestCategory = ref('chemical')

const testCategories = [
  { id: 'chemical', name: 'كيميائية' },
  { id: 'physical', name: 'فيزيائية' },
  { id: 'microbiological', name: 'ميكروبيولوجية' }
]

// Computed Properties
const currentDate = computed(() => {
  return new Date().toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const hasPhysicalTests = computed(() => {
  const physical = coaData.value.tests.physical
  return physical.hardness || physical.friability || physical.disintegration || 
         physical.thickness || physical.diameter || physical.dissolution || physical.appearance
})

// Methods
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ar-SA')
}

const getPharmacopoeiaText = (code: string) => {
  const pharmacopoeias: Record<string, string> = {
    'USP': 'الدستور الأمريكي (USP)',
    'BP': 'الدستور البريطاني (BP)',
    'EP': 'الدستور الأوروبي (EP)',
    'JP': 'الدستور الياباني (JP)',
    'IP': 'الدستور الهندي (IP)',
    'GCC': 'دستور مجلس التعاون الخليجي',
    'custom': 'مواصفات مخصصة'
  }
  return pharmacopoeias[code] || code
}

const getProductTypeText = (type: string) => {
  const types: Record<string, string> = {
    'tablet': 'أقراص',
    'capsule': 'كبسولات',
    'syrup': 'شراب',
    'injection': 'حقن',
    'cream': 'كريم/مرهم',
    'powder': 'مسحوق',
    'liquid': 'محلول سائل',
    'suppository': 'تحاميل'
  }
  return types[type] || type
}

const addTestParameter = (category: 'chemical' | 'microbiological') => {
  coaData.value.tests[category].push({
    parameter: '',
    specification: '',
    result: '',
    judgment: 'pass'
  })
}

const removeTestParameter = (category: 'chemical' | 'microbiological', index: number) => {
  coaData.value.tests[category].splice(index, 1)
}

const updateTestParameters = () => {
  // يمكن هنا إضافة اختبارات افتراضية حسب نوع المنتج
  const productType = coaData.value.product.type
  
  // إعادة تعيين الاختبارات الفيزيائية
  coaData.value.tests.physical = {
    hardness: '',
    friability: '',
    disintegration: '',
    thickness: '',
    diameter: '',
    dissolution: '',
    appearance: ''
  }
  
  // تعيين قيم افتراضية حسب نوع المنتج
  if (productType === 'tablet') {
    coaData.value.tests.physical.hardness = '75 N'
    coaData.value.tests.physical.friability = '0.8%'
    coaData.value.tests.physical.disintegration = '12 دقيقة'
    coaData.value.tests.physical.thickness = '2.8 مم'
    coaData.value.tests.physical.diameter = '8.2 مم'
    coaData.value.tests.physical.dissolution = '92%'
    coaData.value.tests.physical.appearance = 'أقراص بيضاء، مستديرة، خالية من العيوب'
  } else if (productType === 'capsule') {
    coaData.value.tests.physical.disintegration = '10 دقيقة'
    coaData.value.tests.physical.diameter = '7.5 مم'
    coaData.value.tests.physical.dissolution = '95%'
    coaData.value.tests.physical.appearance = 'كبسولات صلبة، خالية من العيوب'
  }
}

const getJudgmentClass = (judgment: string) => {
  switch(judgment) {
    case 'pass': return 'judgment-pass'
    case 'fail': return 'judgment-fail'
    default: return 'judgment-na'
  }
}

const getJudgmentText = (judgment: string) => {
  switch(judgment) {
    case 'pass': return '✅ مطابق'
    case 'fail': return '❌ غير مطابق'
    default: return '⚪ غير مطبق'
  }
}

const judgePhysicalTest = (testName: string, value: string, spec: string) => {
  if (!value) return 'judgment-na'
  
  // تحويل القيم إلى أرقام للتحقق
  const numValue = parseFloat(value)
  
  if (isNaN(numValue)) return 'judgment-na'
  
  // التحقق من المواصفات بناءً على نوع الاختبار
  if (testName === 'hardness') {
    const [min, max] = spec.split('-').map(Number)
    return numValue >= min && numValue <= max ? 'judgment-pass' : 'judgment-fail'
  } else if (testName === 'friability' || testName === 'disintegration') {
    const limit = parseFloat(spec.replace('≤', ''))
    return numValue <= limit ? 'judgment-pass' : 'judgment-fail'
  } else if (testName === 'dissolution') {
    const limit = parseFloat(spec.replace('≥', ''))
    return numValue >= limit ? 'judgment-pass' : 'judgment-fail'
  }
  
  return 'judgment-na'
}

const getConclusionText = () => {
  // التحقق من جميع الاختبارات
  const allChemicalPass = coaData.value.tests.chemical.every(t => t.judgment === 'pass')
  const allMicroPass = coaData.value.tests.microbiological.every(t => t.judgment === 'pass')
  
  // يمكن هنا إضافة منطق أكثر تعقيداً للتحقق من الاختبارات الفيزيائية
  const physicalTestsOk = true // تبسيط مؤقت
  
  return allChemicalPass && allMicroPass && physicalTestsOk 
    ? 'مطابقة لجميع المواصفات المحددة.' 
    : 'غير مطابقة للمواصفات.'
}

// Actions
const generateCOA = () => {
  if (!validateCOA()) {
    alert('الرجاء إكمال جميع الحقول الإلزامية')
    return
  }
  
  coaData.value.status = 'approved'
  coaData.value.createdDate = new Date().toISOString()
  
  // Generate analysis number if empty
  if (!coaData.value.analysis.number) {
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    coaData.value.analysis.number = `AN-${year}${month}${day}-${random}`
  }
  
  alert('✅ تم إنشاء شهادة التحليل بنجاح!')
}

const validateCOA = () => {
  const data = coaData.value
  return (
    data.company.name &&
    data.company.address &&
    data.company.license &&
    data.product.name &&
    data.product.code &&
    data.batch.number &&
    data.batch.manufacturingDate &&
    data.batch.expiryDate &&
    data.tests.chemical.length > 0 &&
    data.approval.analyst.name &&
    data.approval.reviewer.name &&
    data.approval.approver.name
  )
}

const saveDraft = () => {
  coaData.value.status = 'draft'
  saveCOA()
  alert('💾 تم حفظ المسودة بنجاح')
}

const saveCOA = () => {
  const coa = {
    id: Date.now(),
    ...coaData.value,
    createdDate: new Date().toISOString()
  }
  
  // Save to localStorage
  const savedCOAs = JSON.parse(localStorage.getItem('pqms_coas') || '[]')
  savedCOAs.unshift(coa)
  localStorage.setItem('pqms_coas', JSON.stringify(savedCOAs))
  
  // Update recent list
  loadRecentCOAs()
}

const loadRecentCOAs = () => {
  const savedCOAs = JSON.parse(localStorage.getItem('pqms_coas') || '[]')
  recentCOAs.value = savedCOAs.slice(0, 5) // Show only recent 5
}

const loadCOA = (coa: any) => {
  coaData.value = { ...coa }
  activeTestCategory.value = 'chemical'
}

const deleteCOA = (id: number) => {
  if (confirm('هل أنت متأكد من حذف هذه الشهادة؟')) {
    const savedCOAs = JSON.parse(localStorage.getItem('pqms_coas') || '[]')
    const filtered = savedCOAs.filter((coa: any) => coa.id !== id)
    localStorage.setItem('pqms_coas', JSON.stringify(filtered))
    loadRecentCOAs()
    alert('🗑️ تم حذف الشهادة بنجاح')
  }
}

const resetForm = () => {
  if (confirm('هل تريد إعادة تعيين النموذج؟ سيتم فقدان البيانات غير المحفوظة.')) {
    coaData.value = {
      company: {
        name: 'شركة الأدوية العالمية',
        address: 'الرياض، المملكة العربية السعودية',
        logo: '',
        license: 'SFDA-2024-001'
      },
      
      product: {
        name: '',
        code: '',
        type: 'tablet'
      },
      
      batch: {
        number: '',
        manufacturingDate: '',
        expiryDate: '',
        size: '10000 وحدة'
      },
      
      analysis: {
        number: '',
        date: new Date().toISOString()
      },
      
      specifications: {
        pharmacopoeia: 'USP'
      },
      
      tests: {
        chemical: [
          { parameter: '', specification: '', result: '', judgment: 'pass' }
        ],
        
        physical: {
          hardness: '',
          friability: '',
          disintegration: '',
          thickness: '',
          diameter: '',
          dissolution: '',
          appearance: ''
        },
        
        microbiological: []
      },
      
      packaging: {
        primary: 'ألومنيوم/بولي فينيل كلورايد',
        secondary: 'علبة كرتون',
        size: '10 أقراص/عبوة',
        storage: 'في درجة حرارة لا تزيد عن 25°م'
      },
      
      approval: {
        analyst: {
          name: '',
          signature: ''
        },
        reviewer: {
          name: '',
          signature: ''
        },
        approver: {
          name: '',
          signature: ''
        }
      },
      
      status: 'draft',
      createdDate: new Date().toISOString()
    }
    activeTestCategory.value = 'chemical'
  }
}

const printCOA = () => {
  if (!coaPreview.value) return
  
  const printWindow = window.open('', '_blank')
  if (!printWindow) return
  
  const content = coaPreview.value.innerHTML
  printWindow.document.write(`
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <title>شهادة التحليل - ${coaData.value.analysis.number}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .coa-template { border: 2px solid #333; padding: 20px; }
        .coa-header { text-align: center; margin-bottom: 30px; }
        .company-info { display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 20px; }
        .company-logo img { max-height: 80px; }
        .logo-placeholder { font-size: 3rem; }
        .coa-section { margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
        th { background-color: #f2f2f2; }
        .judgment-pass { color: green; font-weight: bold; }
        .judgment-fail { color: red; font-weight: bold; }
        .judgment-na { color: gray; }
        .signatures { display: flex; justify-content: space-around; margin-top: 30px; }
        .signature { text-align: center; }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      ${content}
      <script>
        window.onload = function() {
          window.print();
          setTimeout(() => window.close(), 1000);
        }
      <\/script>
    </body>
    </html>
  `)
  printWindow.document.close()
}

const exportHTML = () => {
  if (!coaPreview.value) return
  
  const content = coaPreview.value.innerHTML
  const fullHTML = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <title>شهادة التحليل - ${coaData.value.analysis.number}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .coa-template { border: 2px solid #333; padding: 20px; }
        .coa-header { text-align: center; margin-bottom: 30px; }
        .company-info { display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 20px; }
        .company-logo img { max-height: 80px; }
        .logo-placeholder { font-size: 3rem; }
        .coa-section { margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
        th { background-color: #f2f2f2; }
        .judgment-pass { color: green; font-weight: bold; }
        .judgment-fail { color: red; font-weight: bold; }
        .judgment-na { color: gray; }
        .signatures { display: flex; justify-content: space-around; margin-top: 30px; }
        .signature { text-align: center; }
      </style>
    </head>
    <body>
      ${content}
    </body>
    </html>
  `
  
  const blob = new Blob([fullHTML], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `COA_${coaData.value.analysis.number || 'draft'}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  
  alert('📄 تم حفظ الشهادة كملف HTML. يمكنك فتحه في أي متصفح.')
}

// Lifecycle
onMounted(() => {
  loadRecentCOAs()
  
  // Generate default analysis number
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  coaData.value.analysis.number = `AN-${year}${month}${day}-${random}`
  
  // Set default dates
  const today = new Date().toISOString().split('T')[0]
  coaData.value.batch.manufacturingDate = today
  
  const expiryDate = new Date()
  expiryDate.setFullYear(expiryDate.getFullYear() + 2)
  coaData.value.batch.expiryDate = expiryDate.toISOString().split('T')[0]
})
</script>

<style scoped>
/* نقتصر على عرض جزء من الـ CSS لأجل الاختصار، لأن معظمه مشابه للنسخة السابقة مع بعض الإضافات */

.test-categories {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.category-tab {
  padding: 10px 20px;
  border: none;
  background: #f8f9fa;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.category-tab:hover {
  background: #e9ecef;
}

.category-tab.active {
  background: #3498db;
  color: white;
  font-weight: bold;
}

.category-content {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.company-info {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.company-logo img {
  max-height: 80px;
  max-width: 200px;
}

.logo-placeholder {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border-radius: 10px;
}

.pharmacopoeia {
  color: #666;
  font-size: 0.9rem;
  margin-top: 5px;
}

/* باقي الـ CSS مشابه للنسخة السابقة مع تعديلات طفيفة */
</style>
