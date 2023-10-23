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

  /**
   * gets a list of all entities with sprites and orders them by y
   * @returns array
   */
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

  function addSolid(id:string, data:{}) {
    entities.value[id].addComponent(
      'solid',
      data
    )
  }

  /**
   * Returns all objects in a particular location
   * @param observedlocation {x: y:}
   * @returns array
   */
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

  function move(id:string, direction:string, canPush = false) {
    console.log('moving: ' + direction)
    if (!entities.value[id].hasComponent('solid')) return
    console.log('a')
    const location = entities.value[id].getComponent('location')
    console.log('b')
    if (!location.movable) return
    console.log('c')
    let newblock = {
      x: location.x,
      y: location.y
    }
    if (location == null) return
    switch(direction) {
      case 'u': {
        newblock.x--
        break
      }
      case 'd': {
        newblock.x++
        break
      }
      case 'l': {
        newblock.y--
        break
      }
      case 'r': {
        newblock.y++
        break
      }
    }
    /** push blockers if we can */
    let blockers
    if (canPush) {
      console.log('pushing')
      let blockers = checkForObjectInLocation(newblock)
      for (const k in blockers) {
        move(blockers[k], direction)
      }
    }
    /** see if we're still stuck */
    blockers = checkForObjectInLocation(newblock)
    if (blockers.length == 0) {
      entities.value[id].updateComponent('location', newblock)
    }
  }

  return {
    entities: entities,
    spawn: spawn,
    expunge: expunge,
    addLocation: addLocation,
    addSprite: addSprite,
    addSolid: addSolid,
    getSprites: getSprites,
    move: move
  }
}
