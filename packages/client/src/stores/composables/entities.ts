import {updateComponent} from '@latticexyz/recs'
import { useEntity } from './entity'
import { ref } from 'vue'

export function useEntities() {
    
  const entities:{} = ref({})
  let entityNonce = 0

  function spawn() {
    const newId = 'entity' + entityNonce
    entities.value[newId] = useEntity(newId)
    entityNonce++
    return newId
  }

  function expunge(id:string) {
    delete entities.value[id]
  }

  function getSprites() {
    let sprites = []    
    for (const k in entities.value) {
      const entity = entities.value[k]
      console.log('entity:', k) 
      if (entity.hasComponent('sprite')) {  
        const sprite = entity.getComponent('sprite')
        const location = entity.getComponent('location')      
        sprites.push({
            id: entity,
            sprite: sprite.sprite ?? '',
            x: location.x ?? 0,
            y: location.y ?? 0
        })
      }
    }
    console.log('done', sprites)
    return sprites.sort((a,b) =>
      (a.x + a.y) - (b.x + b.y)
    )
  }

  function addSprite(id:string, data:{}) {
    entities.value[id].addComponent(
      'sprite',
      data
    )
  }

  function addLocation(id:string, data:{}) {
    entities.value[id].addComponent(
      'location',
      data
    )
  }

  function move(id:string, direction:string) {
    const location = entities.value[id].getComponent('location')
    if (location == null) return
    switch(direction) {
      case 'u': {
        location.x--
        break
      }
      case 'd': {
        location.x++
        break
      }
      case 'l': {
        location.y--
        break
      }
      case 'r': {
        location.y++
        break
      }
    }
    entities.value[id].updateComponent('location', location)
  }

  return {
    entities: entities,
    spawn: spawn,
    expunge: expunge,
    addLocation: addLocation,
    addSprite: addSprite,
    getSprites: getSprites,
    move: move
  }
}
