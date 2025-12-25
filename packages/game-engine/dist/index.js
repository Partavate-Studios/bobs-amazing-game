var A = Object.defineProperty;
var I = (i, n, t) => n in i ? A(i, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[n] = t;
var s = (i, n, t) => I(i, typeof n != "symbol" ? n + "" : n, t);
const v = class v {
  constructor() {
    s(this, "id");
    this.id = v.nextId++;
  }
};
s(v, "nextId", 0);
let M = v;
class h {
  constructor(n) {
    s(this, "entityId");
    this.entityId = n;
  }
}
class S {
  constructor(n) {
    s(this, "world");
    this.world = n;
  }
}
class R {
  constructor() {
    s(this, "entities", /* @__PURE__ */ new Set());
    s(this, "components", /* @__PURE__ */ new Map());
    s(this, "systems", []);
    s(this, "componentTypes", /* @__PURE__ */ new Map());
  }
  /**
   * Create a new entity
   */
  createEntity() {
    const n = new M();
    return this.entities.add(n), n;
  }
  /**
   * Remove an entity and all its components
   */
  removeEntity(n) {
    const t = this.components.get(n.id);
    if (t) {
      for (const [e] of t.entries()) {
        const o = this.componentTypes.get(e);
        o && o.delete(n.id);
      }
      this.components.delete(n.id);
    }
    this.entities.delete(n);
  }
  /**
   * Add a component to an entity
   */
  addComponent(n, t) {
    let e = this.components.get(n.id);
    e || (e = /* @__PURE__ */ new Map(), this.components.set(n.id, e)), e.set(t.constructor, t);
    const o = t.constructor;
    let r = this.componentTypes.get(o);
    return r || (r = /* @__PURE__ */ new Set(), this.componentTypes.set(o, r)), r.add(n.id), t;
  }
  /**
   * Remove a component from an entity
   */
  removeComponent(n, t) {
    const e = this.components.get(n.id);
    if (e) {
      e.delete(t);
      const o = this.componentTypes.get(t);
      o && o.delete(n.id);
    }
  }
  /**
   * Get a component from an entity
   */
  getComponent(n, t) {
    const e = this.components.get(n.id);
    if (e)
      return e.get(t);
  }
  /**
   * Check if an entity has a component
   */
  hasComponent(n, t) {
    const e = this.components.get(n.id);
    return e ? e.has(t) : !1;
  }
  /**
   * Get all entities with a specific component type
   */
  getEntitiesWithComponent(n) {
    const t = this.componentTypes.get(n);
    return t ? Array.from(t).map((e) => Array.from(this.entities).find((o) => o.id === e)).filter((e) => e !== void 0) : [];
  }
  /**
   * Get all components of a specific type
   */
  getComponents(n) {
    return this.getEntitiesWithComponent(n).map((e) => this.getComponent(e, n)).filter((e) => e !== void 0);
  }
  /**
   * Add a system to the world
   */
  addSystem(n) {
    this.systems.push(n), n.init && n.init();
  }
  /**
   * Remove a system from the world
   */
  removeSystem(n) {
    const t = this.systems.indexOf(n);
    t !== -1 && (n.destroy && n.destroy(), this.systems.splice(t, 1));
  }
  /**
   * Update all systems
   */
  update(n) {
    for (const t of this.systems)
      t.update(n);
  }
  /**
   * Get all entities
   */
  getAllEntities() {
    return Array.from(this.entities);
  }
  /**
   * Clear all entities and components
   */
  clear() {
    this.entities.clear(), this.components.clear(), this.componentTypes.clear();
  }
}
class f extends h {
  constructor(t, e, o) {
    super(t);
    s(this, "x");
    s(this, "y");
    this.x = e, this.y = o;
  }
  setLocation(t) {
    this.x = t.x, this.y = t.y;
  }
  getLocation() {
    return { x: this.x, y: this.y };
  }
}
var w = /* @__PURE__ */ ((i) => (i.Up = "U", i.Down = "D", i.Left = "L", i.Right = "R", i))(w || {});
class g extends h {
  constructor(t, e = "D") {
    super(t);
    s(this, "direction");
    s(this, "offset", 0);
    // Animation offset (0-1)
    s(this, "targetLocation", null);
    s(this, "isMoving", !1);
    s(this, "moveStartTime", 0);
    s(this, "moveDuration", 600);
    s(this, "onComplete");
    this.direction = e;
  }
  startMove(t, e = 600, o) {
    this.targetLocation = t, this.isMoving = !0, this.offset = 1, this.moveStartTime = Date.now(), this.moveDuration = e, this.onComplete = o;
  }
  updateOffset(t) {
    if (!this.isMoving || !this.targetLocation) return;
    const e = t - this.moveStartTime, o = Math.min(1, e / this.moveDuration);
    this.offset = 1 - o, o >= 1 && (this.isMoving = !1, this.offset = 0, this.onComplete && (this.onComplete(), this.onComplete = void 0));
  }
  stop() {
    this.isMoving = !1, this.offset = 0, this.targetLocation = null;
  }
}
class K extends h {
  constructor(t, e) {
    super(t);
    s(this, "entityType");
    s(this, "renderCoordinates", { x: 0, y: 0 });
    s(this, "zIndex", 0);
    this.entityType = e;
  }
}
class E extends h {
  constructor(n) {
    super(n);
  }
}
class D extends h {
  constructor(t) {
    super(t);
    s(this, "collected", !1);
  }
}
class m extends h {
  constructor(t) {
    super(t);
    s(this, "hasKey", !1);
    s(this, "won", !1);
    s(this, "grabbingKey", !1);
    s(this, "openingDoor", !1);
    s(this, "movingTarget", !1);
  }
}
class T extends h {
  // 1 = closed, 0 = open
  constructor(t) {
    super(t);
    s(this, "isOpen", !1);
    s(this, "openProgress", 1);
  }
}
class U extends S {
  update(n) {
    const t = Date.now(), e = this.world.getComponents(g);
    for (const o of e)
      o.isMoving && o.updateOffset(t);
  }
}
function O(i, n, t) {
  return {
    x: (i - n) * 64,
    y: (i + n) * 32 - 32 * (t - 1)
  };
}
class W extends S {
  constructor(t, e) {
    super(t);
    s(this, "mapSize");
    this.mapSize = e;
  }
  update(t) {
    const e = this.world.getComponents(K);
    for (const o of e) {
      const r = this.world.getAllEntities().find((d) => d.id === o.entityId);
      if (!r) continue;
      const a = this.world.getComponent(r, f);
      if (!a) continue;
      const c = O(a.x, a.y, this.mapSize), l = this.world.getComponent(r, g);
      let u = 0, y = 0;
      if (l && l.isMoving && l.targetLocation) {
        const d = this.calculateMovementOffset(l);
        u = d.x, y = d.y;
      }
      o.renderCoordinates = {
        x: c.x + u,
        y: c.y + y
      }, o.zIndex = a.y * 1e3 + a.x;
    }
  }
  calculateMovementOffset(t) {
    const e = t.offset;
    let o = { x: 0, y: 0 };
    const r = this.world.getAllEntities().find((c) => c.id === t.entityId);
    if (!r) return o;
    const a = this.world.getComponent(r, m);
    return a ? a.grabbingKey ? o = {
      x: -32 * e,
      y: -16 * e
    } : a.openingDoor ? o = {
      x: -32 + 32 * e,
      y: -16 + 16 * e
    } : o = {
      x: 64 * e,
      y: 32 * e
    } : o = {
      x: 64 * e,
      y: 32 * e
    }, t.direction === w.Down ? (o.x = -o.x, o.y = -o.y) : t.direction === w.Left ? o.y = -o.y : t.direction === w.Right && (o.x = -o.x), o;
  }
  setMapSize(t) {
    this.mapSize = t;
  }
}
class _ extends S {
  constructor(t, e) {
    super(t);
    s(this, "mapSize");
    this.mapSize = e;
  }
  /**
   * Get entity at a specific grid location
   */
  getEntityAt(t, e) {
    if (t < 0 || e < 0 || t >= this.mapSize || e >= this.mapSize)
      return null;
    const o = this.world.getComponents(f);
    for (const r of o)
      if (r.x === t && r.y === e)
        return this.world.getAllEntities().find((c) => c.id === r.entityId);
    return null;
  }
  /**
   * Check if a location is empty
   */
  isLocationEmpty(t, e) {
    return t < 0 || e < 0 || t >= this.mapSize || e >= this.mapSize ? !1 : this.getEntityAt(t, e) === null;
  }
  /**
   * Get target location based on current position and direction
   */
  getTargetLocation(t, e) {
    switch (e) {
      case "U":
        return { x: t.x - 1, y: t.y };
      case "D":
        return { x: t.x + 1, y: t.y };
      case "L":
        return { x: t.x, y: t.y + 1 };
      case "R":
        return { x: t.x, y: t.y - 1 };
      default:
        return { x: t.x, y: t.y };
    }
  }
  /**
   * Check if player can move in a direction
   */
  canMove(t, e) {
    const o = this.world.getComponent(t, m), r = this.world.getComponent(t, f), a = this.world.getComponent(t, g);
    if (!o || !r || a && a.isMoving || o.openingDoor || o.grabbingKey) return !1;
    const c = this.getTargetLocation(r, e), l = this.getEntityAt(c.x, c.y);
    if (!l) return !0;
    if (this.world.getComponent(l, E)) {
      const p = this.getTargetLocation(
        this.world.getComponent(l, f),
        e
      );
      return this.isLocationEmpty(p.x, p.y);
    }
    return !!(this.world.getComponent(l, D) || this.world.getComponent(l, T) && o.hasKey);
  }
  update(t) {
  }
  setMapSize(t) {
    this.mapSize = t;
  }
}
class q extends S {
  constructor(t, e) {
    super(t);
    s(this, "collisionSystem");
    this.collisionSystem = e;
  }
  /**
   * Turn player in a direction
   */
  turn(t) {
    const e = this.getPlayerEntity();
    if (!e) return;
    const o = this.world.getComponent(e, g);
    o && !o.isMoving && (o.direction = t);
  }
  /**
   * Move player in a direction
   */
  move(t) {
    const e = this.getPlayerEntity();
    if (!e) return;
    const o = this.world.getComponent(e, m), r = this.world.getComponent(e, f), a = this.world.getComponent(e, g);
    if (!o || !r || !a || a.isMoving || (this.turn(t), !this.collisionSystem.canMove(e, t)))
      return;
    const c = this.collisionSystem.getTargetLocation(r, t), l = this.collisionSystem.getEntityAt(c.x, c.y);
    if (l) {
      const u = this.world.getComponent(l, E), y = this.world.getComponent(l, D), d = this.world.getComponent(l, T);
      if (u) {
        const p = this.world.getComponent(l, f);
        if (p) {
          const C = this.collisionSystem.getTargetLocation(p, t), x = this.world.getComponent(l, g);
          x ? x.startMove(C, 600, () => {
            p.setLocation(C), o.movingTarget = !1;
          }) : p.setLocation(C), o.movingTarget = !0;
        }
      }
      if (y) {
        o.grabbingKey = !0, o.hasKey = !0, a.startMove(c, 600, () => {
          this.handleCollectKey(l);
        });
        return;
      }
      if (d && o.hasKey) {
        o.openingDoor = !0;
        const p = this.world.getComponent(l, T);
        if (p) {
          const C = Date.now(), x = 600, b = () => {
            const z = Date.now() - C, L = Math.min(1, z / x);
            p.openProgress = 1 - L, L < 1 ? requestAnimationFrame(b) : (p.openProgress = 0, p.isOpen = !0);
          };
          b();
        }
        a.startMove(c, 600, () => {
          this.handleOpenDoor(o);
        });
        return;
      }
    }
    r.setLocation(c), a.startMove(c, 600);
  }
  handleCollectKey(t) {
    const e = this.getPlayerEntity();
    if (!e) return;
    const o = this.world.getComponent(e, m);
    o && (o.grabbingKey = !1), this.world.removeEntity(t);
  }
  handleOpenDoor(t) {
    t.openingDoor = !1, t.won = !0;
  }
  getPlayerEntity() {
    return this.world.getComponents(m).length === 0 ? null : this.world.getAllEntities().find((e) => {
      const o = this.world.getComponent(e, m);
      return o && o.entityId === e.id;
    });
  }
  update(t) {
  }
}
export {
  D as Collectible,
  _ as CollisionSystem,
  h as Component,
  w as Direction,
  T as Door,
  M as Entity,
  q as InputSystem,
  g as Movement,
  U as MovementSystem,
  m as Player,
  f as Position,
  E as Pushable,
  W as RenderSystem,
  K as Renderable,
  S as System,
  R as World,
  O as mapToRenderLocation
};
