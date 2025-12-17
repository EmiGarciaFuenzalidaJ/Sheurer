console.log("propiedades.js cargado correctamente");

/*--------------------------------------------------------------
# Properties List - Filter System
# Archivo: propiedades.js
--------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function () {

  // =============================
  // Elementos del DOM (solo los que usás)
  // =============================
  const filterOperacion = document.getElementById('filterOperacion');
  const filterTipo = document.getElementById('filterTipo');
  const filterUbicacion = document.getElementById('filterUbicacion');
  const resetButton = document.getElementById('resetFilters');

  const propertiesGrid = document.getElementById('propertiesGrid');
  const resultsCount = document.getElementById('resultsCount');
  const noResults = document.getElementById('noResults');

  const properties = document.querySelectorAll('.property-item');

  // =============================
  // Función principal de filtrado
  // =============================
  function filterProperties() {

    const operacion = filterOperacion ? filterOperacion.value.toLowerCase() : '';
    const tipo = filterTipo ? filterTipo.value.toLowerCase() : '';
    const ubicacion = filterUbicacion ? filterUbicacion.value.toLowerCase() : '';

    let visibleCount = 0;

    properties.forEach(property => {
      let isVisible = true;

      if (operacion && property.dataset.operacion !== operacion) {
        isVisible = false;
      }

      if (tipo && property.dataset.tipo !== tipo) {
        isVisible = false;
      }

      if (ubicacion && property.dataset.ubicacion !== ubicacion) {
        isVisible = false;
      }

      if (isVisible) {
        property.classList.remove('hidden');
        visibleCount++;
      } else {
        property.classList.add('hidden');
      }
    });

    // Contador
    if (resultsCount) {
      resultsCount.textContent = visibleCount;
    }

    // Mensaje sin resultados
    if (noResults && propertiesGrid) {
      if (visibleCount === 0) {
        noResults.style.display = 'block';
        propertiesGrid.style.display = 'none';
      } else {
        noResults.style.display = 'none';
        propertiesGrid.style.display = 'grid';
      }
    }
  }

  // =============================
  // Reset de filtros
  // =============================
  function resetFilters() {
    if (filterOperacion) filterOperacion.value = '';
    if (filterTipo) filterTipo.value = '';
    if (filterUbicacion) filterUbicacion.value = '';

    filterProperties();
  }

  // =============================
  // Event listeners (seguros)
  // =============================
  if (filterOperacion) {
    filterOperacion.addEventListener('change', filterProperties);
  }

  if (filterTipo) {
    filterTipo.addEventListener('change', filterProperties);
  }

  if (filterUbicacion) {
    filterUbicacion.addEventListener('change', filterProperties);
  }

  if (resetButton) {
    resetButton.addEventListener('click', resetFilters);
  }

  // Inicializar
  filterProperties();
});

/* ============================================
   INSTRUCCIONES PARA AGREGAR MÁS PROPIEDADES
   ============================================

   Para agregar una nueva propiedad, copia este bloque en el HTML:

   <div class="property-item" 
        data-operacion="[alquiler/venta]" 
        data-tipo="[casa/departamento/terreno/local]" 
        data-ubicacion="[godoy-cruz/ciudad/guaymallen]" 
        data-habitaciones="[número]" 
        data-banos="[número]" 
        data-cochera="[si/no]" 
        data-superficie="[número]">
     <a href="propiedad-detalle.html" class="property-link">
       <div class="property-item-image">
         <img src="../assets/img/propertyX.jpg" alt="Descripción">
         <span class="property-item-badge [alquiler/venta]">[Alquiler/Venta]</span>
       </div>
       <div class="property-item-content">
         <div class="property-item-header">
           <h3>Título de la Propiedad</h3>
           <span class="property-item-price">USD XX,XXX</span>
         </div>
         <p class="property-item-location">
           <i class="bi bi-geo-alt"></i>
           Ubicación, Mendoza
         </p>
         <div class="property-item-features">
           <span class="feature-chip">
             <i class="bi bi-house-door"></i>
             X hab
           </span>
           <span class="feature-chip">
             <i class="bi bi-droplet"></i>
             X baño
           </span>
           <span class="feature-chip">
             <i class="bi bi-rulers"></i>
             XXX m²
           </span>
           <span class="feature-chip">
             <i class="bi bi-car-front"></i>
             X cochera
           </span>
         </div>
       </div>
     </a>
   </div>

   IMPORTANTE: Los valores de data-* deben coincidir EXACTAMENTE con:
   - data-operacion: "alquiler" o "venta"
   - data-tipo: "casa", "departamento", "terreno", o "local"
   - data-ubicacion: "godoy-cruz", "ciudad", "guaymallen" (agregar más en el select)
   - data-habitaciones: número entero (ej: "3")
   - data-banos: número entero (ej: "2")
   - data-cochera: "si" o "no"
   - data-superficie: número entero de m² (ej: "125")

   ============================================
   AGREGAR NUEVAS UBICACIONES
   ============================================

   Para agregar más ubicaciones:

   1. En el HTML, agregar opción en el select de ubicación:
      <option value="nueva-ubicacion">Nombre Ubicación</option>

   2. En las propiedades, usar el mismo valor en data-ubicacion:
      data-ubicacion="nueva-ubicacion"

   El sistema filtrará automáticamente.
*/