{"filter":false,"title":"serializeForm.js","tooltip":"/app/src/lib/serializeForm.js","undoManager":{"mark":19,"position":19,"stack":[[{"start":{"row":0,"column":0},"end":{"row":39,"column":1},"action":"insert","lines":["let valueTypes = ['INPUT', 'TEXTAREA']","let booleanTypes = ['checkbox', 'radio']","","export default function serializeForm (form) {","  if (!form || form.nodeName !== 'FORM') {","    return null","  }","  let i = null","  let j = null","  let obj = {}","","  for (i = form.elements.length - 1; i >= 0; i = i - 1) {","    let el = form.elements[i]","    if (el.name === '') {","      continue","    }","    if (valueTypes.indexOf(el.nodeName) >= 0) {","      if (booleanTypes.indexOf(el.type) >= 0) {","        if (el.checked) {","          obj[el.name] = el.value","        }","      } else {","        obj[el.name] = el.value","      }","    } else if (el.nodeName === 'SELECT') {","      if (el.type === 'select-multiple') {","        let arr = []","        for (j = el.options.length - 1; j <= 0; j = j - 1) {","          if (el.options[j].selected) {","            arr.push(el.options[j].value)","          }","        }","        obj[el.name] = arr","      } else {","        obj[el.name] = el.value","      }","    }","  }","  return obj","}"],"id":1}],[{"start":{"row":39,"column":1},"end":{"row":40,"column":0},"action":"insert","lines":["",""],"id":2}],[{"start":{"row":37,"column":3},"end":{"row":38,"column":0},"action":"insert","lines":["",""],"id":3},{"start":{"row":38,"column":0},"end":{"row":38,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":38,"column":2},"end":{"row":38,"column":3},"action":"insert","lines":["c"],"id":4}],[{"start":{"row":38,"column":3},"end":{"row":38,"column":4},"action":"insert","lines":["o"],"id":5}],[{"start":{"row":38,"column":4},"end":{"row":38,"column":5},"action":"insert","lines":["n"],"id":6},{"start":{"row":38,"column":5},"end":{"row":38,"column":6},"action":"insert","lines":["s"]}],[{"start":{"row":38,"column":6},"end":{"row":38,"column":7},"action":"insert","lines":["o"],"id":7}],[{"start":{"row":38,"column":7},"end":{"row":38,"column":8},"action":"insert","lines":["l"],"id":8}],[{"start":{"row":38,"column":8},"end":{"row":38,"column":9},"action":"insert","lines":["e"],"id":9}],[{"start":{"row":38,"column":9},"end":{"row":38,"column":10},"action":"insert","lines":["."],"id":10}],[{"start":{"row":38,"column":10},"end":{"row":38,"column":11},"action":"insert","lines":["l"],"id":11}],[{"start":{"row":38,"column":11},"end":{"row":38,"column":12},"action":"insert","lines":["o"],"id":12}],[{"start":{"row":38,"column":12},"end":{"row":38,"column":13},"action":"insert","lines":["g"],"id":13}],[{"start":{"row":38,"column":13},"end":{"row":38,"column":15},"action":"insert","lines":["()"],"id":14}],[{"start":{"row":38,"column":14},"end":{"row":38,"column":15},"action":"insert","lines":["o"],"id":15}],[{"start":{"row":38,"column":15},"end":{"row":38,"column":16},"action":"insert","lines":["b"],"id":16}],[{"start":{"row":38,"column":16},"end":{"row":38,"column":17},"action":"insert","lines":["j"],"id":17}],[{"start":{"row":38,"column":2},"end":{"row":38,"column":18},"action":"remove","lines":["console.log(obj)"],"id":18}],[{"start":{"row":38,"column":0},"end":{"row":38,"column":2},"action":"remove","lines":["  "],"id":19}],[{"start":{"row":37,"column":3},"end":{"row":38,"column":0},"action":"remove","lines":["",""],"id":20}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":8,"column":14},"end":{"row":8,"column":14},"isBackwards":false},"options":{"tabSize":2,"useSoftTabs":true,"guessTabSize":false,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1500914909000,"hash":"6f19225044e85f7b1eed1f00c4016b0e85aeec72"}