import { ref } from 'vue'

export function useEntity(id:string) {
    
  let components:any = ref({})

  function addComponent(name:string, component:{}) {
    components.value[name] = component  
  }

  function removeComponent(name:string) {
    delete components.value[name]
  }

  function getComponent(name:string) {
    return components.value[name] ?? null
  }

  function hasComponent(name:string):boolean {
    console.log('has')
    for (const k in components.value) {
      console.log('test', k)
      if (k == name) {
        return true
      }
    }
    return false
  }
 
  function updateComponent(name:string, data:{}) {
    components.value[name] = data
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