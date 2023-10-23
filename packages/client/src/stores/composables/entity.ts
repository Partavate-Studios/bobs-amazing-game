import { ref } from 'vue'

export function useEntity(id:string) {
    
  let components:any = ref({})

  function addComponent(name:string, data:{}) {
    components.value[name] = data  
  }

  function removeComponent(name:string) {
    delete components.value[name]
  }

  function getComponent(name:string) {
    return components.value[name] ?? null
  }

  function hasComponent(name:string):boolean {
    for (const k in components.value) {
      if (k == name) {
        return true
      }
    }
    return false
  }
 
  function updateComponent(name:string, data:{}) {
    for (const k in data) {
      components.value[name][k] = data[k]
    }
    
  }

  return {
    id: id,
    components: components,
    addComponent: addComponent,
    getComponent: getComponent,
    removeComponent: removeComponent,
    hasComponent: hasComponent,
    updateComponent: updateComponent
  }
}