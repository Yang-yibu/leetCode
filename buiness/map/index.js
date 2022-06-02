/**
 * 地图 - 数据库
 * { [mapName]: zqName }
 */
const nameMap = {};
/** 数据库 - 地图 */
const nameMap_db2map = {};


/* ----------------------- 政区数据 ----------------------- */
const regionJson = require('./sys_zq.json')

/** 政区：一级编码映射 */
const zq_pCodeName = {}
regionJson.RECORDS.map(item => {
  if (item.dict_level * 1 === 1) {
    const code = item.dict_code
    const name = item.dict_label
    if (!zq_pCodeName[code]) {
      zq_pCodeName[code] = name
    }
  }
})
console.log(zq_pCodeName);
/* --------------------- 政区数据 end ---------------------- */

/* ----------------------- 地图数据 ----------------------- */
const geoChina = require('./china.json')
const features = geoChina.features

const region = {}
/** 地图：一级编码映射 */
const map_pCodeName = {}
const regionNames = []
features.map(item => {
  const prop = item.properties
  const code = prop.adcode
  const name = prop.name
  if (!region[code]) {
    region[code] = prop
    map_pCodeName[code] = name
    regionNames.push(name)

    nameMap[name] = zq_pCodeName[code]
    nameMap_db2map[zq_pCodeName[code]] = name
  }
})
console.log(regionNames, regionNames.length);
console.log(map_pCodeName);
/* --------------------- 地图数据 end ---------------------- */

console.log(nameMap);
console.log(nameMap_db2map);




