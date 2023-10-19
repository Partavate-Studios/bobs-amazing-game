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

  function checkForObjectInLocation(observedlocation:{}) {
    console.log('checking for objects')
    let objects = []
    for (const k in entities.value) {
      const entity = entities.value[k]  
      if (entity.hasComponent('location')) {
        const objectLocation = entity.getComponent('location')
        if ((observedlocation.x == objectLocation.x) && (observedlocation.y == objectLocation.y)) {
            console.log('location', objectLocation.y)
            console.log('found', k)
            objects.push(k)
        }
      }
    }
    console.log('objects', objects)
    return objects
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
    const blockers = checkForObjectInLocation(location)
    console.log('blockers', blockers)
    for (const k in blockers) {
      if (blockers[k] != id) {
        move(blockers[k], direction)
      }
      console.log('BLOCKERS', entities.value[blockers[k]].value)
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
