/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";

/**
 * Copyright (c) 2017, Oracle and/or its affiliates.
 * All rights reserved.
 */
define(['ojs/ojcore'], function(oj)
{
/**
 * An immutable set of keys.
 * @class KeySet
 * @ojstatus preview
 * @classdesc The base class for ExpandedKeySet and ExpandAllKeySet.  Represents an immutable set of keys.
 * @constructor
 * @hideconstructor
 * @abstract
 */
var KeySet = function() {};

// Subclass from oj.Object 
oj.Object.createSubclass(KeySet, oj.Object, "KeySet");

// make it available internally
oj.KeySet = KeySet;

/**
 * Initialize the internal Set with a set of keys.
 *
 * @param {Set|Array|null|undefined} keys the initial keys to create the internal Set with.
 * @protected
 */
KeySet.prototype.InitializeWithKeys = function(keys)
{
    this._keys = this._populate(keys);
};

/**
 * Sets the internal Set object.
 *
 * @param {Set} set the internal Set object to replace with.
 * @protected
 */
KeySet.prototype.SetInternal = function(set)
{
    this._keys = set;
};

/**
 * Returns a new KeySet based on this set with the specified keys included.
 *
 * @param {Set|Array} keys a set of keys to add to this KeySet.
 * @return {KeySet} a new KeySet with the specified keys included.
 * @method
 * @name add
 * @memberof! KeySet
 * @instance
 * @abstract
 */

/**
 * Returns a new KeySet that signals all keys are added to this set. 
 *
 * @return {KeySet} a new KeySet that signals all keys are added to this set.
 * @method
 * @name addAll
 * @memberof! KeySet
 * @instance
 * @abstract
 */

/**
 * Returns a new KeySet based on this set with the specified keys excluded. 
 *
 * @param {Set|Array} keys a set of keys to remove from this KeySet.
 * @return {KeySet} a new KeySet with the specified keys excluded.
 * @method
 * @name delete
 * @memberof! KeySet
 * @instance
 * @abstract
 */

/**
 * Returns whether this set should include all keys.
 *
 * @return {boolean} true if this set should include all keys, false otherwise.
 * @method
 * @name isAddAll
 * @memberof! KeySet
 * @instance
 * @abstract
 */

/**
 * Returns whether the specified key is contained in this set.
 *
 * @param {*} key the key to check whether it is contained in this set.
 * @return {boolean} true if the specified key is contained in this set, false otherwise.
 * @method
 * @name has
 * @memberof! KeySet
 * @instance
 * @abstract
 */

/**
 * Returns a new KeySet containing no keys.
 *
 * @return {KeySet} a new KeySet with no keys.
 * @method
 * @name clear
 * @memberof! KeySet
 * @instance
 * @abstract
 */

/**
 * Adds or deletes a set of keys from the internal Set object.
 * @param {boolean} isAdd true if add operation, false if delete operation
 * @param {Set|Array} keys keys to add or delete
 * @return {KeySet} returns current KeySet if add or delete is not performed, or a new KeySet with the
 *                     specified keys included (add) or excluded (delete).
 * @protected
 */
KeySet.prototype.AddOrDeleteInternal = function(isAdd, keys)
{
    var newSet, keySet;

    newSet = isAdd ? this._add(keys) : this._remove(keys);
    if (newSet == null)
    {
        return this;
    }
    else
    {
        keySet = /** @type {KeySet} */ (Object.create(Object.getPrototypeOf(this)));
        keySet.SetInternal(newSet);
        return keySet;
    }
};

/**
 * Adds the specified keys to the internal Set object.
 * @param {Set|Array} keys a set of keys to add
 * @return {Set} a new Set based on this internal Set with the specified keys appended to the end, or null if nothing was added.
 * @private
 */
KeySet.prototype._add = function(keys)
{
    var self = this, newSet = null, key;

    keys.forEach(function(key)
    {
        // checks if it's already contained in the Set, can't use has() since it does a reference comparison
        if (self.FindEquals(key) == null)
        {
            if (newSet == null)
            {
                newSet = self.Clone();
            }
            newSet.add(key);
        }
    });

    return newSet;
};

/**
 * Helper method to remove the specified keys from its set
 * @param {Set|Array} keys an interable set of keys to remove
 * @return {Set|null} a new Set based on this internal Set with the keys removed, or null if nothing is removed.
 * @private
 */
KeySet.prototype._remove = function(keys)
{
    var self = this, newSet = null, key, keyToDelete;

    // first check if there's anything to remove
    if (this._keys.size == 0)
    {
        return null;
    }

    keys.forEach(function(key)
    {
        // see if we can find a equivalent key in this Set since delete does a reference comparison to find the item to delete
        keyToDelete = self.FindEquals(key);
        if (keyToDelete != null)
        {
            if (newSet == null)
            {
                newSet = self.Clone();
            }
            newSet.delete(keyToDelete);
        }
    });

    return newSet;
};

/**
 * Finds the equavalent key of the specified key within this KeySet.
 * @param {*} keyToFind the key to find
 * @return {*} the key in the key that is equivalent to keyToFind, or null if nothing equivalent can be found.
 * @protected
 */
KeySet.prototype.FindEquals = function(keyToFind)
{
    var iterator, key, found = null;

    if (this._keys.has(keyToFind))
    {
        return keyToFind;
    }

    // using iterator if it's supported since we could break at any time
    if (typeof Symbol === "function" && typeof Set.prototype[Symbol.iterator] === "function")
    {
        iterator = this._keys[Symbol.iterator]();
        key = iterator.next();
        while (!key.done)
        {
            if (oj.Object.compareValues(key.value, keyToFind) || key.value == keyToFind)
            {
                return key.value;
            }
            key = iterator.next();
        }
    }
    else
    {
        // IE11 supports forEach
        this._keys.forEach(function(key)
        {
            if (found == null && oj.Object.compareValues(key, keyToFind) || key == keyToFind)
            {
                found = key;
            }
        });
    }

    return found;
};

/**
 * Returns the size of this Set.
 * @return {number} the size of this Set.
 * @protected
 */
KeySet.prototype.GetInternalSize = function()
{
    return this._keys.size;
};

/**
 * Return a clone of the internal Set
 * @return {Set} the clone of the internal Set
 * @protected
 */
KeySet.prototype.Clone = function()
{
    return this._populate(this._keys);
};

/**
 * IE11 does not support constructor with arguments
 * TODO: move to CollectionUtils
 * @private
 */
KeySet.prototype._populate = function(keys)
{
    var set = new Set(keys);
    if (keys != null && set.size == 0)
    {
        keys.forEach(function(key)
        {
            set.add(key);
        });             
    }
    return set;
};
/**
 * Create a new immutable KeySet containing the keys of the expanded items.
 * Use this KeySet when specifying individual keys to expand.
 *
 * @param {Set|Array=} keys A set of keys to initialize this KeySet with.
 * @ojstatus preview
 * @class ExpandedKeySet
 * @classdesc The ExpandedKeySet class contains a set of keys of the expanded items.
 * @extends {KeySet}
 * @constructor
 * @example <caption>Creates a new ExpandedKeySet with an initial set of keys to expand:</caption>
 * require(['ojs/ojkeyset'], 
 *   function(keySet) {
 *     var expandedKeySet = new keySet.ExpandedKeySet(['group1', 'group3']);
 *   }
 * ); 
 */
var ExpandedKeySet = function(keys)
{
    this.InitializeWithKeys(keys);
};

// Subclass from KeySet
oj.Object.createSubclass(ExpandedKeySet, KeySet, "ExpandedKeySet");

// make it available internally
oj.ExpandedKeySet = ExpandedKeySet;

/**
 * Returns a new KeySet based on this set with the specified keys included.
 * If none of the keys specified are added then this KeySet is returned.
 *
 * @param {Set|Array} keys a set of keys to add to this KeySet.
 * @return {ExpandedKeySet} a new KeySet with the specified keys included.
 * @expose
 * @instance
 * @alias add
 * @memberof! ExpandedKeySet 
 */
ExpandedKeySet.prototype.add = function(keys)
{
    return /** @type {!ExpandedKeySet} */ (this.AddOrDeleteInternal(true, keys));
};

/**
 * Returns a new KeySet that signals all keys are added to this set. 
 *
 * @return {ExpandAllKeySet} a new KeySet that signals all keys are added to this set.
 * @expose
 * @instance
 * @alias addAll
 * @memberof! ExpandedKeySet 
 */
ExpandedKeySet.prototype.addAll = function()
{
    return new ExpandAllKeySet();
};

/**
 * Returns whether this set should include all keys.
 *
 * @return {boolean} true if this set includes all keys, false otherwise.
 * @expose
 * @instance
 * @alias isAddAll
 * @memberof! ExpandedKeySet 
 */
ExpandedKeySet.prototype.isAddAll = function()
{
    return false;
};

/**
 * Returns a new KeySet based on this set with the specified keys excluded.  
 * If none of the keys specified are deleted then this KeySet is returned.
 *
 * @param {Set|Array} keys a set of keys to remove from this KeySet.
 * @return {ExpandedKeySet} a new KeySet with the specified keys excluded.
 * @expose
 * @instance
 * @alias delete
 * @memberof! ExpandedKeySet 
 */
ExpandedKeySet.prototype.delete = function(keys)
{
    return /** @type {!ExpandedKeySet} */ (this.AddOrDeleteInternal(false, keys));
};

/**
 * Returns a new KeySet containing no keys.  If this KeySet already contains no keys then 
 * the current KeySet is returned.
 *
 * @return {ExpandedKeySet} a new KeySet with no keys.
 * @expose
 * @instance
 * @alias clear
 * @memberof! ExpandedKeySet 
 */
ExpandedKeySet.prototype.clear = function()
{
    return this.GetInternalSize() == 0 ? this : new ExpandedKeySet();
};

/**
 * Returns whether the specified key is contained in this set.
 *
 * @param {*} key the key to check whether it is contained in this set.
 * @return {boolean} true if the specified key is contained in this set, false otherwise.
 * @expose
 * @instance
 * @alias has
 * @memberof! ExpandedKeySet 
 */
ExpandedKeySet.prototype.has = function(key)
{
    return (this.FindEquals(key) != null);
};

/**
 * Returns the keys in this KeySet in the order they are added.
 *
 * @return {Set} the keys in this KeySet in the order they are added.
 * @expose
 * @instance
 * @alias values
 * @memberof! ExpandedKeySet 
 */
ExpandedKeySet.prototype.values = function()
{
    return this.Clone();
};
/**
 * Create a new immutable KeySet containing the keys of the collapsed items.
 * Use this KeySet when expanding all keys.
 * 
 * @ojstatus preview
 * @class ExpandAllKeySet
 * @classdesc The ExpandAllKeySet class represents a set with all keys expanded.
 * @extends {KeySet}
 * @constructor
 * @example <caption>Creates a new ExpandAllKeySet to expand all keys</caption>
 * require(['ojs/ojkeyset'], 
 *   function(keySet) {
 *     var expandAllKeySet = new keySet.ExpandAllKeySet();
 *   }
 * ); 
 */
var ExpandAllKeySet = function()
{
    this.InitializeWithKeys(null);
};

// Subclass from KeySet
oj.Object.createSubclass(ExpandAllKeySet, KeySet, "ExpandAllKeySet");

// make it available internally
oj.ExpandAllKeySet = ExpandAllKeySet;

/**
 * Returns a new KeySet with the specified keys excluded from a set of collapsed keys.
 * If the keys specified are already added then this KeySet is returned.
 *
 * @param {Set|Array} keys a set of keys to add to this KeySet.
 * @return {ExpandAllKeySet} a new KeySet with the specified keys included.
 * @expose
 * @instance
 * @alias add
 * @memberof! ExpandAllKeySet 
 */
ExpandAllKeySet.prototype.add = function(keys)
{
    // add keys on expand all = remove collapsed keys
    return /** @type {!ExpandAllKeySet} */ (this.AddOrDeleteInternal(false, keys));
};

/**
 * Returns a new KeySet that signals all keys are added to this set.  If this KeySet already
 * has all keys added, then this KeySet is returned.
 *
 * @return {ExpandAllKeySet} a new KeySet that signals all keys are added to this set.
 * @expose
 * @instance
 * @alias addAll
 * @memberof! ExpandAllKeySet 
 */
ExpandAllKeySet.prototype.addAll = function()
{
    return this.GetInternalSize() == 0 ? this : new ExpandAllKeySet();
};

/**
 * Returns whether this set should include all keys.
 *
 * @return {boolean} true if this set includes all keys, false otherwise.
 * @expose
 * @instance
 * @alias isAddAll
 * @memberof! ExpandAllKeySet 
 */
ExpandAllKeySet.prototype.isAddAll = function()
{
    return true;
};

/**
 * Returns a new KeySet based on this set with the specified keys included in a set of collapsed keys.
 * If the keys specified are already deleted then this KeySet is returned.
 *
 * @param {Set|Array} keys a set of keys to remove from this KeySet.
 * @return {ExpandAllKeySet} a new KeySet with the specified keys excluded.
 * @expose
 * @instance
 * @alias delete
 * @memberof! ExpandAllKeySet 
 */
ExpandAllKeySet.prototype.delete = function(keys)
{
    // remove keys on expand all = add collapsed keys
    return /** @type {!ExpandAllKeySet} */ (this.AddOrDeleteInternal(true, keys));
};

/**
 * Returns a new KeySet containing no keys.
 *
 * @return {ExpandedKeySet} a new KeySet with no keys.
 * @expose
 * @instance
 * @alias clear
 * @memberof! ExpandAllKeySet 
 */
ExpandAllKeySet.prototype.clear = function()
{
    return new ExpandedKeySet();
};

/**
 * Returns whether the specified key is contained in this set.
 *
 * @param {*} key the key to check whether it is contained in this set.
 * @return {boolean} true if the specified key is contained in this set, false otherwise.
 * @expose
 * @instance
 * @alias has
 * @memberof! ExpandAllKeySet 
 */
ExpandAllKeySet.prototype.has = function(key)
{
    return (this.FindEquals(key) == null);
};

/**
 * Returns a set of keys of the collapsed items.
 * 
 * @return {Set} the keys of the collapsed items.
 * @expose
 * @instance
 * @alias deletedValues
 * @memberof! ExpandAllKeySet 
 */
ExpandAllKeySet.prototype.deletedValues = function()
{
    return this.Clone();
};
;return {
  'KeySet': KeySet,
  'ExpandedKeySet': ExpandedKeySet,
  'ExpandAllKeySet': ExpandAllKeySet
}

});
