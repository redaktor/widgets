import { vCB, cgkFN } from '../../interfaces';
import { toStr } from '../lang/to';
import { reduce } from './each';
function _cgk(
	a: any, fn?: any, start?: number, end?: number, step?: number,
	type = 'count'
) {
	const reduceFn = (o: any, v: any) => {
    let k = toStr(v, fn);
    if (typeof k === 'string') {
    	if (type === 'group') {
      	if (!Array.isArray(o[k])) { o[k] = [] }
        o[k].push(v)
      } else {
	      o[k] = type === 'key' ? v : ((o[k] || 0) + 1)
			}
    }
    return o
  }
  return reduce(a, reduceFn, {}, start, end, step)
}
export function count(a: any, start: number = 0, end?: number, step?: number) {
	return _cgk(a, void 0, start, end, step)
}
const cgkFns = ['countBy','groupBy','keyBy'];
export const [countBy, groupBy, keyBy]: cgkFN[] = cgkFns.map((k: string) =>
  (a: any, fn: vCB, start: number = 0, end?: number, step?: number) => _cgk(a, fn, start, end, step));
