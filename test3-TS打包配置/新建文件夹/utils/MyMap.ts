/**
 * const dics = new dic<string, number>();

    dics.set('a', 11);
    dics.set('b', 22);
    dics.set('a', 33);
    dics.set('c', 43);

    dics.forEach((k, v) => {
      console.log(`key:${k},val:${v}`);

    })

    dics.del('c');

    dics.forEach((k, v) => {
      console.log(`key:${k},val:${v}`);
    })

    console.log(dics.has('c'));
    console.log(dics.has('a'));

    console.log('获取键的数量：', dics.size);

    dics.clear();
 */

export interface MapCb<K, V> {
  /**
   * 键值对的 key 和 val, 无返回
   */
  (key: K, val: V): void;
}

export class MyMap<K, V> {
  // 定义两个容器，来装对应的键集合或者值集合
  private keys: K[] = [];
  private vals: V[] = [];

  /**
   * 重新设置某个键对应的值，如果不存在，则添加
   * @param key 
   * @param val 
   */
  set(key: K, val: V) {
    // 判断键集合中是否存在，存在的话直接来改
    const index = this.keys.indexOf(key);
    if (index >= 0) {
      // 存在直接修改
      this.vals[index] = val;
    } else {
      // 不存在，直接添加
      this.keys.push(key);
      this.vals.push(val);
    }
  }

  /**
   * 遍历键值对
   * @param callback 
   */
  forEach(callback: MapCb<K, V>) {
    this.keys.forEach((key, index) => {
      callback(key, this.vals[index]);
    })
  }
  /**
   * 通过指定的key 来删除val
   * @param key 
   */
  del(key: K): Boolean {
    const index = this.keys.indexOf(key);
    if (index < 0) {
      // 不存在，直接抛出错误，说该键不存在
      return false;
    } 

    // 存在，直接删除
    this.keys.splice(index, 1);
    this.vals.splice(index, 1);

    return true;
  }
  
  getKey(index:number) : K {
    if (index < 0 || index >= this.keys.length) return null;

    return this.keys[index];
  }

  getItem(key:K) : V {
    const index = this.keys.indexOf(key);
    if (index < 0) return null;

    return this.vals[index];
  }

  /**
   * 判断某个键是否存在
   * @param key 
   */
  has(key: K) {
    const index = this.keys.indexOf(key);
    if (index >= 0) return true;

    return false;
  }
  /**
   * 得到键的数量
   */
  get size() {
    return this.keys.length;
  }

  /**
   * 清除所有的键值对
   */
  clear() {
    this.keys = [];
    this.vals = [];
  }
}
