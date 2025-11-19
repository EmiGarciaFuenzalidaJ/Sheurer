console.log("propiedades.js cargado correctamente");

/*--------------------------------------------------------------
# Properties List - Filter System
# Archivo: propiedades.js
--------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
  
  // Elementos del DOM
  const filterOperacion = document.getElementById('filterOperacion');
  const filterTipo = document.getElementById('filterTipo');
  const filterUbicacion = document.getElementById('filterUbicacion');
  const filterHabitaciones = document.getElementById('filterHabitaciones');
  const filterBanos = document.getElementById('filterBanos');
  const filterCochera = document.getElementById('filterCochera');
  const filterSuperficie = document.getElementById('filterSuperficie');
  const resetButton = document.getElementById('resetFilters');
  const propertiesGrid = document.getElementById('propertiesGrid');
  const resultsCount = document.getElementById('resultsCount');
  const noResults = document.getElementById('noResults');

  // Obtener todas las propiedades
  const properties = document.querySelectorAll('.property-item');

  // Función principal de filtrado
  function filterProperties() {
    const filters = {
      operacion: filterOperacion.value.toLowerCase(),
      tipo: filterTipo.value.toLowerCase(),
      ubicacion: filterUbicacion.value.toLowerCase(),
      habitaciones: filterHabitaciones.value,
      banos: filterBanos.value,
      cochera: filterCochera.value,
      superficie: filterSuperficie.value
    };

    let visibleCount = 0;

    properties.forEach(property => {
      let isVisible = true;

      // Filtro: Operación (alquiler/venta)
      if (filters.operacion && property.dataset.operacion !== filters.operacion) {
        isVisible = false;
      }

      // Filtro: Tipo de propiedad
      if (filters.tipo && property.dataset.tipo !== filters.tipo) {
        isVisible = false;
      }

      // Filtro: Ubicación
      if (filters.ubicacion && property.dataset.ubicacion !== filters.ubicacion) {
        isVisible = false;
      }

      // Filtro: Habitaciones
      if (filters.habitaciones) {
        const propHab = parseInt(property.dataset.habitaciones);
        const filterHab = parseInt(filters.habitaciones);
        
        if (filters.habitaciones === '4') {
          // 4+ habitaciones
          if (propHab < 4) {
            isVisible = false;
          }
        } else {
          // Número exacto
          if (propHab !== filterHab) {
            isVisible = false;
          }
        }
      }

      // Filtro: Baños
      if (filters.banos) {
        const propBanos = parseInt(property.dataset.banos);
        const filterBanosVal = parseInt(filters.banos);
        
        if (filters.banos === '3') {
          // 3+ baños
          if (propBanos < 3) {
            isVisible = false;
          }
        } else {
          // Número exacto
          if (propBanos !== filterBanosVal) {
            isVisible = false;
          }
        }
      }

      // Filtro: Cochera
      if (filters.cochera) {
        const hasCochera = property.dataset.cochera === 'si';
        if (filters.cochera === 'si' && !hasCochera) {
          isVisible = false;
        }
        if (filters.cochera === 'no' && hasCochera) {
          isVisible = false;
        }
      }

      // Filtro: Superficie
      if (filters.superficie) {
        const superficie = parseInt(property.dataset.superficie);
        
        switch(filters.superficie) {
          case '0-50':
            if (superficie > 50) isVisible = false;
            break;
          case '50-100':
            if (superficie < 50 || superficie > 100) isVisible = false;
            break;
          case '100-150':
            if (superficie < 100 || superficie > 150) isVisible = false;
            break;
          case '150-200':
            if (superficie < 150 || superficie > 200) isVisible = false;
            break;
          case '200':
            if (superficie < 200) isVisible = false;
            break;
        }
      }

      // Mostrar u ocultar propiedad
      if (isVisible) {
        property.classList.remove('hidden');
        visibleCount++;
      } else {
        property.classList.add('hidden');
      }
    });

    // Actualizar contador
    resultsCount.textContent = visibleCount;

    // Mostrar mensaje de "sin resultados"
    if (visibleCount === 0) {
      noResults.style.display = 'block';
      propertiesGrid.style.display = 'none';
    } else {
      noResults.style.display = 'none';
      propertiesGrid.style.display = 'grid';
    }
  }

  // Función para resetear filtros
  function resetFilters() {
    filterOperacion.value = '';
    filterTipo.value = '';
    filterUbicacion.value = '';
    filterHabitaciones.value = '';
    filterBanos.value = '';
    filterCochera.value = '';
    filterSuperficie.value = '';
    
    filterProperties();
  }

  // Event Listeners para todos los filtros
  filterOperacion.addEventListener('change', filterProperties);
  filterTipo.addEventListener('change', filterProperties);
  filterUbicacion.addEventListener('change', filterProperties);
  filterHabitaciones.addEventListener('change', filterProperties);
  filterBanos.addEventListener('change', filterProperties);
  filterCochera.addEventListener('change', filterProperties);
  filterSuperficie.addEventListener('change', filterProperties);
  resetButton.addEventListener('click', resetFilters);

  // Inicializar contador al cargar la página
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