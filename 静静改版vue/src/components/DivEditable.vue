<template>
  <div class="div-editable" id="msg_edit_area" ref="editDiv" contenteditable="true" v-html="innerText" @input="changeText" @focus="focusFunc" @blur="blurFunc" @keydown="handleKeydown($event)">

  </div>

</template>
<script>
import services from '../../static/utils/services'
import utils from '../../static/utils/utils'

// import filter from '../../static/utils/filter'
// var htmlOverviewMsgTemp = filter.htmlOverviewMsgTemp();
export default {
  name: 'DivEditable',
  filters: {
    // htmlOverviewMsgTemp
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    chatIdObj: {
      default: ''
    }
  },

  data() {
    return {
      innerText: this.value,
      isChange: true,
      // 定义鼠标光标值
      editRange: null,

    };
  },
  watch: {
    value(e) {
      console.log('1val', e)
      if (this.isChange) {
        console.log('2val', this.value)
        this.innerText = this.value.replace(/\s+/g, ' ');
      }
      if (!this.value) {
        this.$el.innerHTML = '';
      }
    }
  },
  mounted() {
    this.$refs.editDiv.focus();
  },

  methods: {

    submit() {
      console.log('回车发送');
    },
    handleKeydown(event) {

      console.log(event)
      if (event.ctrlKey && event.keyCode === 13) {
        //ctrl+enter 换行
        // console.log('ctrl+enter 换行');
        this.textareaRange();
      } else if (event.keyCode === 13) {
        //enter
        let msgconten = this.sendTextMsg();
        // 调用 main页 函数 发送消息
        this.$emit('sendMessage', this.chatIdObj.Id, msgconten);
        // console.log('回车发送');
        event.preventDefault() // 阻止浏览器默认换行操作
        return false
      } else if (event.keyCode === 32) {
        //   Space  空格
        //  var regEx = /\s+/g;
        //  this.$nextTick(() => {
        //    this.$refs.editDiv.innerHTML = this.$refs.editDiv.innerHTML.replace(regEx, ' ');
        //  })
        //     console.log( this.$refs.editDiv.innerHTML);
        //  this.changeText();
      }

    },
    // 回车发送- 发送消息过滤处理
    sendTextMsg: (() => {
      var forbidden = false;
      var lastSendTime = 0;
      var max = 5, minSeconds = 1000;
      var count = 0;
      var stopTime = 2000;
      return function () {
        if (forbidden) {
          return;
        };
        var now = utils.getNow();
        if (lastSendTime) {
          if (now - lastSendTime < minSeconds) {
            count++;
          }
          if (count >= max) {
            forbidden = true;
          }
        } else {
          count++;
        }
        lastSendTime = utils.getNow();
        setTimeout(function () {
          forbidden = false;
          lastSendTime = 0;
          count = 0;
        }, stopTime);
        let node = this.$refs.editDiv;
        var res = this.splitContent(node);
        var reg1 = /^\s+|\s+$/g;
        var isOneBr = /^<br\s*\/*>$/;
        var preEnd = /<\/pre>$/;
        if (res.length) {
          for (var i = 0; i < res.length; i++) {
            var content = res[i];
            if (typeof content == 'string') {
              content = content.replace(preEnd, '');
              if (content != '' && !isOneBr.test(content)) {
                content = services.convertMsg(content);
                if (content.length > 10000) {
                  alert(langPack.getKey('msgTooLong'));
                  return;
                }
                console.log(content);
                return content;
                // var msg = services.chatService.createMessage($scope.chatData.currentChat, webConfig.MSG_TYPE_MAP[webConfig.MSG_TEXT_TYPE], content);
                // sendMsg(msg);
              }
            } else {
              var src = content.src;
              var size = 0;
              var file = {
                Path: src,
                Size: size
              };
              var nameArr = src.split('/');
              var name = nameArr[nameArr.length - 1];
              try {
                name = decodeURIComponent(name);
              } catch (e) {
              }
              return file;
              // var message = createMessage($scope.chatData.currentChat, webConfig.MSG_TYPE_MAP[webConfig.MSG_PIC_TYPE], name, file);
              // sendMsg(message);
            }
          }
          // $scope.msg.msgContent = '';
          // delete tempContent[$scope.chatData.currentChat];
        }
      }
    })(),
    splitContent(node, res, keep) {
      res = res || [];
      var childNodes = node.childNodes;
      var cur;
      for (var i = 0; i < childNodes.length; i++) {
        cur = childNodes[i];
        var nodeType = cur.nodeType;
        var prev = res[Math.max(0, res.length - 1)];
        if (!prev) {
          prev = '';
        }
        if (nodeType == 1) {
          var tagName = cur.tagName.toLowerCase();
          if (tagName == 'div') {
            this.splitContent(cur, res);
          } else if (tagName == 'img') {
            if (cur.getAttribute('isface')) {
              res[Math.max(0, res.length - 1)] = prev + cur.outerHTML;
            } else {
              var reg = /\?_=\w+$/g;
              cur.src = cur.src.replace(reg, '');
              res.push(cur);
              res.push('');
            }
          } else {
            res[Math.max(0, res.length - 1)] = prev + cur.outerHTML;
          }
        } else if (nodeType == 3) {
          res[Math.max(0, res.length - 1)] = prev + cur.nodeValue;
        }
      }
      if (!keep) {
        for (var i = res.length - 1; i >= 0; i--) {
          if (typeof res[i] == 'string') {
            res[i] = res[i].replace(/<br\s*\/*>\s*\n*$/, '');
            res[i] = res[i].replace(/^<br\s*\/*>\s*\n*/, '');
          }
          if (/^\s*(\s*<br\s*\/*>\s*\n*)*\s*$/.test(res[i])) {
            res.splice(i, 1);
          }
        }
      }
      return res;
    },
    changeText() {
      console.log(this.$el.innerHTML);
      //  this.$emit('input', this.$el.innerHTML.replace(/\s+/g, ' '));
      // this.$emit('input', this.$el.innerHTML.replace(/<div><br><\/div>/g, '<br/>'));
      this.$emit('input', this.$el.innerHTML);
       if (window.getSelection) {
            this.setSelection();
            if ( this.editRange.endContainer.nodeType != 3) {
                 this.editRange.collapse(false);
            }
        }
    },
    blurFunc(val) {
      // console.log('blurFunc', this.value, this.innerText)
      this.isChange = true;
      this.$emit('blurFunc');
      // 记录光标标位置
      // this.setEditRange()
    },
    focusFunc() {
      // console.log('focusFunc', this.value, this.innerText)
      this.$refs.editDiv.focus();
      this.isChange = false;
      this.saveRange();
    },

    saveRange() {
      var selection = window.getSelection ? window.getSelection() : document.selection;
      if (!selection.rangeCount) return;
      var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
      window._range = range;
    },
    //获取表情
    handleEmotion(src, title) {
      this.$refs.editDiv.focus();
      // if(!i){
      //   return;
      // };
      // console.log(src, title, this.$refs.myref);
      //   let src = require('../assets/images/qqemoji/e100.png')
      // var img = `<img src="https://.../${i}.gif" align="top">`;//这里接的是表情的img（不方便给地址，你们自己解决下啊）
      var img = `<img src="${src}"  isface="1" title='[${title ? title : ''}]'>`;
      var selection,
        range = window._range;
      if (!window.getSelection) {
        range.pasteHTML(img);
        range.collapse(false);
        range.select();
      } else {
        selection = window.getSelection ? window.getSelection() : document.selection;
        range.collapse(false);
        var hasR = range.createContextualFragment(img);
        var hasR_lastChild = hasR.lastChild;
        while (
          hasR_lastChild &&
          hasR_lastChild.nodeName.toLowerCase() == 'br' &&
          hasR_lastChild.previousSibling &&
          hasR_lastChild.previousSibling.nodeName.toLowerCase() == 'br'
        ) {
          var e = hasR_lastChild;
          hasR_lastChild = hasR_lastChild.previousSibling;
          hasR.removeChild(e);
        }
        range.insertNode(hasR);
        if (hasR_lastChild) {
          range.setEndAfter(hasR_lastChild);
          range.setStartAfter(hasR_lastChild);
        }
        selection.removeAllRanges();
        selection.addRange(range);
      }
      this.changeText();
    },
    addhtml(i) {
      this.$refs.editDiv.focus();
      console.log(i)
      // let src = require(i)
      //   let src = require('../assets/images/qqemoji/e100.png')
      // var img = `<img src="https://.../${i}.gif" align="top">`;//这里接的是表情的img（不方便给地址，你们自己解决下啊）
      //   var img = `<img src="${i}" align="top">`;
      var img = `${i}`;
      var selection,
        range = window._range;
      if (!window.getSelection) {
        range.pasteHTML(img);
        range.collapse(false);
        range.select();
      } else {
        selection = window.getSelection ? window.getSelection() : document.selection;
        range.collapse(false);
        var hasR = range.createContextualFragment(img);
        var hasR_lastChild = hasR.lastChild;
        while (
          hasR_lastChild &&
          hasR_lastChild.nodeName.toLowerCase() == 'br' &&
          hasR_lastChild.previousSibling &&
          hasR_lastChild.previousSibling.nodeName.toLowerCase() == 'br'
        ) {
          var e = hasR_lastChild;
          hasR_lastChild = hasR_lastChild.previousSibling;
          hasR.removeChild(e);
        }
        range.insertNode(hasR);
        if (hasR_lastChild) {
          range.setEndAfter(hasR_lastChild);
          range.setStartAfter(hasR_lastChild);
        }
        selection.removeAllRanges();
        selection.addRange(range);
      }
      // this.changeText();
    },
    // 设置记录光标对象
    setEditRange() {
      // 获取选定对象
      let selection = window.getSelection ? window.getSelection() : document.selection;
      // 设置最后光标对象
      this.lastEditRange = selection.getRangeAt(0);
      console.log(this.lastEditRange)
      //      document.getElementById('msg_edit_area').innerHTML=document.getElementById('msg_edit_area').innerHTML.replace(/\s+/g, ' ');
      //             this.$nextTick(() => {
      //        // 获取选定对象
      // var selection =  window.getSelection ? window.getSelection() : document.selection;
      // // 如果保存的有上次的光标对象
      // if (this.lastEditRange) {
      //   // 清除所有选区
      //   // selection.removeAllRanges();
      //   // 添加最后光标还原之前的状态
      //   selection.addRange(this.lastEditRange);
      // } })
    },
    //换行并重新定位光标位置
    textareaRange() {
      var area = document.getElementById('msg_edit_area');
      var br = '<br />';
      var brCount = 1;
      var editArea = this.$refs.editDiv;
      var child = editArea.childNodes;
      if (window.getSelection) {
        var sel = window.getSelection();
        // 选区的终点位置。
        var focusOffset = sel.focusOffset;
        // 选区终点的节点。
        var focusNode = window.getSelection().focusNode;
        if (focusNode && focusNode != editArea) {
          if (focusOffset != 0 && focusNode.wholeText.length == focusOffset) {
            // br += '<br idx="'+brIdx+'"/>';
            // brIdx ++;
            br += br;
            brCount = 2;
          } else {
            var next = window.getSelection().focusNode.nextSibling;
            do
              if (!next || next.nodeValue || "BR" == next.tagName || next.id == 'caretPosHelper')
                break;
            while (next = next.nextSibling);
            if (!next) {

            } else {
              if (this.innerText == '' || next.tagName == 'BR') {
                // br += '<br idx="'+brIdx+'"/>';
                // brIdx ++;
                br += br;
                brCount = 2;
              }
            }
          }
        } else {
          // br += '<br idx="'+brIdx+'"/>';
          // brIdx ++;
          br += br;
          brCount = 2;
        }
        this.insertHtmlByCommand(br, brCount);

      }
    },
    insertHtmlByCommand(html, brCount) {
      var editSelection = document.getSelection();
      html = html + '<span id="insert_helper" style="position:absolute;left:auto;top:auto;z-index:99999;"></span>';
      var editRange = editSelection.getRangeAt(0);
      if (editRange) {
        // if (editRange.commonAncestorContainer = !editArea || (editRange.commonAncestorContainer != editArea && $editArea.find(editRange.commonAncestorContainer).size() == 0)) {
        //     editAreaFocus();
        //     setSelection();
        // }
        editSelection.removeAllRanges(editRange);
        editSelection.addRange(editRange);
        var endContainer = editRange.endContainer;
        if (endContainer.nodeType == 3) {
          var text = endContainer.nodeValue;
          if (text.length == editRange.endOffset) {
            if (endContainer.nextElementSibling && endContainer.nextElementSibling.tagName == 'BR') {
              html = html + '<br>';
            }
          }
        }
      };
      this.$nextTick(() => {
        // var oldScrollHeight = area.scrollHeight;
        // var scrollTop = area.scrollTop;
        document.execCommand('insertHTML', false, html);
        // this.innerText = this.$refs.editDiv.innerHTML;
        if (editSelection && editRange) {
          editSelection.removeAllRanges(editRange);
        }
        var helper = document.getElementById('insert_helper');
        if (editSelection && editRange) {
          var focusNode = editSelection.focusNode;
          editSelection.removeAllRanges(editRange);
          // 设置光标开始结束位置
          if (brCount == 2) {
            editRange.setStartBefore(helper.previousElementSibling);
            editRange.setEndBefore(helper.previousElementSibling);
          } else {
            editRange.setStartBefore(helper);
            editRange.setEndBefore(helper);
          }
           console.log(editRange);
           //开始结束位置加入光标的选区
          editSelection.addRange(editRange);
        }
        helper.parentNode.removeChild(helper);
        // this.innerText = this.$refs.editDiv.innerHTML;
      })
      return;
    },
    setSelection() {
        if (document.getSelection) {
            var  editSelection = document.getSelection();
            if (editSelection.rangeCount) {
                this.editRange = editSelection.getRangeAt(0);
            }
        } else {
             this.editRange = document.selection.createRange();
        }
    }
  }
};
</script>

<style scoped>
.div-editable {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  word-break: break-all;
  outline: none;
  user-select: text;
  white-space: pre-wrap;
  text-align: left;
  min-height: 100px;
}

.div-editable[contenteditable="true"] {
  user-modify: read-write-plaintext-only;
}

.div-editable[contenteditable="true"]:empty:before {
  content: attr(placeholder);
  display: block;
  color: #ccc;
}

.div-editable::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  cursor: pointer;
}
.div-editable::-webkit-scrollbar-thumb:hover {
  /*滚动条里面小方块*/
  box-shadow: inset 0 0 5px #c7c9cc;
  cursor: pointer;
  background-color: #c7c9cc;
}
.div-editable::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  display: block;
  border-radius: 6px;
  box-shadow: inset 0 0 5px #dddee0;
  cursor: pointer;
  background-color: #dddee0;
}
.div-editable::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  /* background-color: #dadada; */
}
</style>
