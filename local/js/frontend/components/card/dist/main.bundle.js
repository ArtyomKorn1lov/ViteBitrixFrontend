/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const V = [], j = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), N = Object.assign, m = Array.isArray, C = (t) => typeof t == "function", u = (t) => typeof t == "string", z = (t) => typeof t == "symbol", p = (t) => t !== null && typeof t == "object";
let E;
const F = () => E || (E = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function T(t) {
  if (m(t)) {
    const n = {};
    for (let e = 0; e < t.length; e++) {
      const l = t[e], s = u(l) ? M(l) : T(l);
      if (s)
        for (const i in s)
          n[i] = s[i];
    }
    return n;
  } else if (u(t) || p(t))
    return t;
}
const w = /;(?![^(]*\))/g, q = /:([^]+)/, B = /\/\*[^]*?\*\//g;
function M(t) {
  const n = {};
  return t.replace(B, "").split(w).forEach((e) => {
    if (e) {
      const l = e.split(q);
      l.length > 1 && (n[l[0].trim()] = l[1].trim());
    }
  }), n;
}
function d(t) {
  let n = "";
  if (u(t))
    n = t;
  else if (m(t))
    for (let e = 0; e < t.length; e++) {
      const l = d(t[e]);
      l && (n += l + " ");
    }
  else if (p(t))
    for (const e in t)
      t[e] && (n += e + " ");
  return n.trim();
}
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(z)
);
function O(t) {
  return t ? !!t.__v_raw : !1;
}
function P(t) {
  return t ? t.__v_isRef === !0 : !1;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let f = null, D = null;
const L = (t) => t.__isTeleport;
function k(t, n) {
  t.shapeFlag & 6 && t.component ? (t.transition = n, k(t.component.subTree, n)) : t.shapeFlag & 128 ? (t.ssContent.transition = n.clone(t.ssContent), t.ssFallback.transition = n.clone(t.ssFallback)) : t.transition = n;
}
F().requestIdleCallback;
F().cancelIdleCallback;
const U = Symbol.for("v-ndc"), G = {}, x = (t) => Object.getPrototypeOf(t) === G, Y = (t) => t.__isSuspense, I = Symbol.for("v-fgt"), H = Symbol.for("v-txt"), K = Symbol.for("v-cmt"), _ = [];
let a = null;
function J(t = !1) {
  _.push(a = t ? null : []);
}
function Q() {
  _.pop(), a = _[_.length - 1] || null;
}
function W(t) {
  return t.dynamicChildren = a || V, Q(), a && a.push(t), t;
}
function X(t, n, e, l, s, i) {
  return W(
    b(
      t,
      n,
      e,
      l,
      s,
      i,
      !0
    )
  );
}
function Z(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
const R = ({ key: t }) => t ?? null, g = ({
  ref: t,
  ref_key: n,
  ref_for: e
}) => (typeof t == "number" && (t = "" + t), t != null ? u(t) || P(t) || C(t) ? { i: f, r: t, k: n, f: !!e } : t : null);
function b(t, n = null, e = null, l = 0, s = null, i = t === I ? 0 : 1, o = !1, r = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: n,
    key: n && R(n),
    ref: n && g(n),
    scopeId: D,
    slotScopeIds: null,
    children: e,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: l,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: f
  };
  return r ? (A(c, e), i & 128 && t.normalize(c)) : e && (c.shapeFlag |= u(e) ? 8 : 16), // avoid a block node from tracking itself
  !o && // has current parent block
  a && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && a.push(c), c;
}
const $ = v;
function v(t, n = null, e = null, l = 0, s = null, i = !1) {
  if ((!t || t === U) && (t = K), Z(t)) {
    const r = h(
      t,
      n,
      !0
      /* mergeRef: true */
    );
    return e && A(r, e), !i && a && (r.shapeFlag & 6 ? a[a.indexOf(t)] = r : a.push(r)), r.patchFlag = -2, r;
  }
  if (st(t) && (t = t.__vccOpts), n) {
    n = tt(n);
    let { class: r, style: c } = n;
    r && !u(r) && (n.class = d(r)), p(c) && (O(c) && !m(c) && (c = N({}, c)), n.style = T(c));
  }
  const o = u(t) ? 1 : Y(t) ? 128 : L(t) ? 64 : p(t) ? 4 : C(t) ? 2 : 0;
  return b(
    t,
    n,
    e,
    l,
    s,
    o,
    i,
    !0
  );
}
function tt(t) {
  return t ? O(t) || x(t) ? N({}, t) : t : null;
}
function h(t, n, e = !1, l = !1) {
  const { props: s, ref: i, patchFlag: o, children: r, transition: c } = t, S = n ? et(s || {}, n) : s, y = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: S,
    key: S && R(S),
    ref: n && n.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      e && i ? m(i) ? i.concat(g(n)) : [i, g(n)] : g(n)
    ) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: r,
    target: t.target,
    targetStart: t.targetStart,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: n && t.type !== I ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && h(t.ssContent),
    ssFallback: t.ssFallback && h(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return c && l && k(
    y,
    c.clone(y)
  ), y;
}
function nt(t = " ", n = 0) {
  return $(H, null, t, n);
}
function A(t, n) {
  let e = 0;
  const { shapeFlag: l } = t;
  if (n == null)
    n = null;
  else if (m(n))
    e = 16;
  else if (typeof n == "object")
    if (l & 65) {
      const s = n.default;
      s && (s._c && (s._d = !1), A(t, s()), s._c && (s._d = !0));
      return;
    } else {
      e = 32;
      const s = n._;
      !s && !x(n) ? n._ctx = f : s === 3 && f && (f.slots._ === 1 ? n._ = 1 : (n._ = 2, t.patchFlag |= 1024));
    }
  else C(n) ? (n = { default: n, _ctx: f }, e = 32) : (n = String(n), l & 64 ? (e = 16, n = [nt(n)]) : e = 8);
  t.children = n, t.shapeFlag |= e;
}
function et(...t) {
  const n = {};
  for (let e = 0; e < t.length; e++) {
    const l = t[e];
    for (const s in l)
      if (s === "class")
        n.class !== l.class && (n.class = d([n.class, l.class]));
      else if (s === "style")
        n.style = T([n.style, l.style]);
      else if (j(s)) {
        const i = n[s], o = l[s];
        o && i !== o && !(m(i) && i.includes(o)) && (n[s] = i ? [].concat(i, o) : o);
      } else s !== "" && (n[s] = l[s]);
  }
  return n;
}
{
  const t = F(), n = (e, l) => {
    let s;
    return (s = t[e]) || (s = t[e] = []), s.push(l), (i) => {
      s.length > 1 ? s.forEach((o) => o(i)) : s[0](i);
    };
  };
  n(
    "__VUE_INSTANCE_SETTERS__",
    (e) => e
  ), n(
    "__VUE_SSR_SETTERS__",
    (e) => e
  );
}
function st(t) {
  return C(t) && "__vccOpts" in t;
}
const lt = (t, n) => {
  const e = t.__vccOpts || t;
  for (const [l, s] of n)
    e[l] = s;
  return e;
}, it = {};
function ct(t, n) {
  return J(), X("div", null, n[0] || (n[0] = [
    b("h1", null, "Заголовок", -1),
    b("p", null, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda at cum dicta dolor, eaque earum expedita fuga id magni maxime quae quis quisquam, rerum sint. Animi ex id maiores.", -1)
  ]));
}
const ot = /* @__PURE__ */ lt(it, [["render", ct]]);
export {
  ot as default
};
