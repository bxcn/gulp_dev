var AjaxTree = {

};

function TreeCURD (_that, renderTool, treeCURD) {
	var bind = function(id, type, fn) {
		id.onclick = fn;
	};
	var treeCURD = this;
	this.renderTool = renderTool;
	this.addCommand = function(id, that) {

		var rootParent = _that.closest(".panel-body");
		var child = rootParent.find(".child" + id);
		var parent = rootParent.find(".parent" + id);
		var last = child&&child.children&&child.children().size() ? false : true;

		if ( !child.size()) {
			parent.after('<div class="tree-child child'+id+'"></div>');			
		}

		var treeOnly = document.createElement("div");
			treeOnly.setAttribute("class","tree-only "+(last ? "last" : ""));
		var i = document.createElement("i");	

		var curdModal = document.createElement("span");
			curdModal.setAttribute("class","curd-modal");
		var input = document.createElement("input");
			input.type = "text";
			input.value = "";
			input.maxlength = 5;
		var okBtn = document.createElement("span");
			okBtn.setAttribute("class", "treeBtn ml5 ok");
			okBtn.innerHTML = "确定";
		bind(okBtn, "click", function() {
			treeCURD.saveCommand(id, okBtn);
		});
		var cancelBtn = document.createElement("span");
			cancelBtn.setAttribute("class", "treeBtn ml5 cancel");
			cancelBtn.innerHTML = "取消";
		bind(cancelBtn, "click", function() {
			treeCURD.cancelCommand(id, cancelBtn);
		});

		curdModal.appendChild(input);
		curdModal.appendChild(okBtn);
		curdModal.appendChild(cancelBtn);
		treeOnly.appendChild(i);
		treeOnly.appendChild(curdModal);

		child = rootParent.find(".child" + id);
		child.prepend(treeOnly);

	};
	this.saveCommand = function(id, that) {
		that = $(that);
		var groupName = $.trim(that.prev().val());
		if (groupName == "") {
			alert("请输入分组名称");
			return;
		}

		ajaxData.post({
			url:"/FavoriteGroup/add",
			data:{group_name:groupName, group_pid:id},
			success: function( result ) {
				if ( result.state ) {
					alert(result.msg);
					renderTool.render();
				} else {
					alert(result.msg);
				}
			}
		});

	},
	this.modifyCommand = function(id){

		var that = this;
		var rootParent = _that.closest(".panel-body");
		var name = rootParent.find("#name"+id);
		
		var curdModal = document.createElement("span");
			curdModal.setAttribute("class","curd-modal");

		var input = document.createElement("input");
			input.type = "text";
			input.value = name.attr("name");
			input.maxlength = 5;
		var okBtn = document.createElement("span");
			okBtn.setAttribute("class", "treeBtn ml5 ok");
			okBtn.innerHTML = "确定";
		bind(okBtn, "click", function() {
			treeCURD.updateCommand(id, okBtn);
		});
		var cancelBtn = document.createElement("span");
			cancelBtn.setAttribute("class", "treeBtn ml5 cancel");
			cancelBtn.innerHTML = "取消";
		bind(cancelBtn, "click", function() {
			treeCURD.cancelCommand(id, cancelBtn);
		});

		curdModal.appendChild(input);
		curdModal.appendChild(okBtn);
		curdModal.appendChild(cancelBtn);

		name.hide().before(curdModal);
		name.next().hide();

	};
	this.updateCommand = function(id, that){
		that = $(that);
		var groupName = $.trim(that.prev().val());
		if (groupName == "") {
			alert("请输入分组名称");
			return;
		}

		ajaxData.post({
			url:"/FavoriteGroup/edit",
			data:{group_name:groupName, id:id},
			success: function( result ) {
				if ( result.state ) {
					alert(result.msg);
					renderTool.render();
				} else {
					alert(result.msg);
				}
			}
		});
	};
	this.delCommand = function(id, that){
		$("#delGroupId").val(id);
		$("#delGroupName").html($("#name"+id).attr("name"));
		delGroupDialog.dialog("open");
		
	};
	this.cancelCommand = function(id,that, state){
		var rootParent = _that.closest(".panel-body");

		if ( state == "add" ) {
			rootParent.find(".child"+id).children().eq(0).remove();
		} else {
			var curdModal = $(that).parent(".curd-modal");
			curdModal.next().show().next().removeAttr("style");
			curdModal.remove();
		}
	};
	this.clickCommand = function(id,that, state){
		
	};
	this.favoriteCommand = function(group_id,that){
		var id = $("#FavoriteIds").val();
		ajaxData.post({
			url:"/Favorite/add/",
			data:{cust_ids: id, "group_id": group_id},
			success: function(result) {
				if ( result.state ) {
					var array = id.split(",");
					$(array).each(function(i, data) {
						$(".favoriteId" + data).removeClass("starstroke").addClass("starfill");
					});
					$("#FavoriteIds").val("");
					alert("收藏成功");	
					modifyGroup.dialog("close");
				} else {
					alert(result.msg);
				}
			}
		});
	}; 
	this.moveCommand = function(group_id,that) {
		id = $("#moveGroupIds").val();
		ajaxData.post({
			url:"/Favorite/changeGroup/",
			data:{ids: id, "group_id": group_id},
			success: function(result) {
				if ( result.state ) {
					$("#moveGroupIds").val("");
					modifyGroup.dialog("close");	
					promptDialog("转移成功",{OKText:"关闭",ok:function(){
  					window.location.reload();
					}});
					
				} else {
					alert(result.msg);
				}
			}
		});
	}; 
}

function TreeCommand( CURD ) {
	var _that = this;
	this.CURD = CURD;
	this.execute = function(id, that){
		_that.CURD(id, that);
	};
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function CreateTreeDOM( param ) {

	this.id = param.data.id; // 主键
	this.name = param.data.group_name; //组名
	this.total = param.data.count; // 组中的记录
 
	this.isLink = param.isLink;
	this.isToolBar = param.isToolBar;
	this.commandTool = param.commandTool;
	this.last = param.last;
	this.add = param.add;
	this.modify = param.modify;
	this.del = param.del;
	this.isShowNode = param.isShowNode;
	this.isShowFolder = param.isShowFolder;
	this.root = document.createDocumentFragment();

}
CreateTreeDOM.prototype = {
	// 创建外层元素
	getOuter: function() {

		var that = this;
		var folder = (this.isShowFolder ? "folder" : "only");
		var panel = document.createElement("div");
			panel.setAttribute("class", (this.last ? "tree-"+folder+" last parent" + this.id : "tree-"+folder+" parent" + this.id));

		if (this.isShowNode) {
			var i = document.createElement("i");
			panel.appendChild(i);

			if ( folder == "folder" ) {
				that.bind(i,"click", function(){
					var parent = i.parentElement;
					var className = parent.getAttribute("class");
					var child = parent.nextSibling;
					var display = child.style.display || "block";
					if ( display != "block" ) {
						child.style.display = "block";
						parent.setAttribute("class", className.replace(" fold",""));

					} else {
						child.style.display = "none";
						parent.setAttribute("class", className+" fold");
					}

				});
			}
		}

		if ( this.isShowFolder ) {
			var b = document.createElement("b");
			panel.appendChild(b);
		}

		var link = document.createElement("a");
			link.setAttribute("class", "folder");
			link.href= this.isLink ? "/Favorite/index/group_id/" + this.id :"javascript:void(0)";
			link.innerHTML = this.name+"["+this.total+"]";
			link.name = this.name;
			link.id = "name" + this.id;

		that.bind(link,"click", function(){
			that.commandTool.clickCommand.execute(that.id, link);
		});
		panel.appendChild(link);

		this.panel = panel;
	},
	operaBar: function() {
		var that = this;
		if (this.isToolBar) {

			var toolbar = document.createElement("span");
				toolbar.setAttribute("class", "toolbar");

			var add = document.createElement("a");
				add.setAttribute("class", "add");
				add.setAttribute("title", "新建子分组");
				add.setAttribute("data-action", "mk");
				add.href="javascript:void(0)";
				add.innerHTML = "添加";
				add.id = this.id;

			that.bind(add,"click", function(){
				that.commandTool.addCommand.execute(that.id,add);
			})

			var modify = document.createElement("a");
				modify.setAttribute("class", "modify");
				modify.setAttribute("title", "修改分组");
				modify.setAttribute("data-action", "mv");
				modify.href="javascript:void(0)";
				modify.innerHTML = "修改";
				modify.id = this.id;

			that.bind(modify,"click", function(){
				that.commandTool.modifyCommand.execute(that.id,modify);
			});

			var del = document.createElement("a");
				del.setAttribute("class", "del");
				del.setAttribute("title", "删除确认分组");
				del.setAttribute("data-action", "rm");
				del.href="javascript:void(0)";
				del.innerHTML = "删除";
				del.id = this.id;

			that.bind(del,"click", function(){
				that.commandTool.delCommand.execute(that.id, del);
			});

			if ( this.add ) {
				toolbar.appendChild(add);
			}
			if ( this.modify ) {
				toolbar.appendChild(modify);
			}
			if ( this.del ) {
				toolbar.appendChild(del);
			}

			this.panel.appendChild(toolbar);
		}	
	},
	getWrap: function() {

		var child = document.createElement("div");
			child.setAttribute("class", "tree-child child" + this.id);
		
		this.root.appendChild(this.panel);
		this.root.appendChild(child);

		this.child = child;
		this.element = this.root;
	},
	bind: function(id, type, fn) {
		id.onclick = fn;
	}
}
 
// 门面模式 对于一个复杂的系统，需要把个分成一个一个的子系统，按顺序
function CompositeFacade(param) {  
 var createTreeDOM = new CreateTreeDOM(param);
 createTreeDOM.getOuter();
 createTreeDOM.operaBar();
 createTreeDOM.getWrap();
 return createTreeDOM;
 
}
 
function TreeComposite(param) {

	var id = param.data.id; // 主键
	var add = modify = del =true;
	var isShowFolder = true; // 显示文件夹图标
	var isShowNode = (id != -1);// 是否显示节点图标
	var compositeFacade = null;

	if ( id == -1 ) {
		modify = del = false;
	}

	param["isShowFolder"] = isShowFolder;
	param["isShowNode"] = isShowNode;
	param["add"] = add;
	param["modify"] = modify;
	param["del"] = del;

	compositeFacade = CompositeFacade(param);
	this.child = compositeFacade.child;
	this.element = compositeFacade.root;
	this.level = param.level;
}
TreeComposite.prototype = {
		
	addNode: function(treeNode) {
		this.child.appendChild(treeNode.getElement());

	},
	getElement: function() {
		return this.element;
	},
	getLevel: function() {
		return this.level;
	},
	setLevel: function( level ) {
		this.level = level;
	}
	
}

function TreeLeaf(param) {

	var id = param.data.id; // 主键
	var add = modify = del =true;
	var isShowFolder = false; // 不显示文件夹图标
	var isShowNode = true; // 显示节点图标
	var compositeFacade = null;

	if ( id == 0 ) {
		add = modify = del = false;
	}
	// level级别，maxlLevel最大到几个
	if ( param.level > param.maxLevel) {
		add = false;
	}

	
	param["isShowFolder"] = isShowFolder;
	param["isShowNode"] = isShowNode;
	param["add"] = add;
	param["modify"] = modify;
	param["del"] = del;

	compositeFacade = CompositeFacade(param);

	this.child = compositeFacade.child;
	this.element = compositeFacade.root;
	this.level = param.level;
}
TreeLeaf.prototype = {
	addNode: function(treeNode) {},
	getElement: function() {
		return this.element;
	},
	getLevel: function() {
		return this.level;
	},
	setLevel: function( level ) {
		this.level = level;
	}
}

// 递归迭代集合中的组合对象
/*function LevelNodeRender( currData, parentNode, isLink, isToolBar, maxLevel, commandTool) {
	return;
	// 判断
	var len = currData.child && currData.child.length || 0;

	// 无子元素个数返回
	if ( !len ) {
		return;
	}

	var level = parentNode.getLevel() + 1;

	for( var i = 0; i < len; i++) {

		var data = currData.child[i];//获取集合中的单个元素

		var childLen = data.child && data.child.length || 0; // 子集的个数
		var last = (len == (i+1)); // 是否是最后一个元素
		
		// 当前组元素是组合对象(Composite)还是单个对象(Leaf)
		if ( childLen ) {
			var treeComposite = new TreeComposite(data, level, maxLevel, last, isLink, isToolBar, commandTool);
				parentNode.addNode(treeComposite);
				LevelNodeRender(data, treeComposite, isLink, isToolBar, maxLevel, commandTool); // 组合对象 递归调用它的子元素
		} else {
			var treeLeaf = new TreeLeaf(data, level, (data.id==0 ? 1 : maxLevel), last,  isLink, isToolBar, commandTool);
			parentNode.addNode(treeLeaf);
		}
	}

	parentNode.setLevel(level);
	return parentNode;
}

function treeGroupView(parent, isLink, isToolBar, maxLevel) {

	return;
	maxLevel = maxLevel || 3;
	var  data = {
		id:-1,
		group_name:"全部",
		count:"0",
		group_pid:0
	}
	var last = true;
	var treeRoot = new TreeComposite(data, 1, maxLevel, last, isLink, isToolBar, CommandTool);
		treeRoot.setLevel(1);


	ajaxData.post({
		url:"/FavoriteGroup/jsonList",
		success: function( result ) {
			if ( result.state ) {
				result["child"] = result["child"] || result.data;
				var node = LevelNodeRender(result, treeRoot, isLink, isToolBar, maxLevel, CommandTool);
				parent.html("").append(node.getElement());
			}
		}
	});
}*/

$(function(){
	$.fn.treeNav = function(defaults) {
		var that = $(this);

		var parent = that;
		var settings = {
			isLink: true,
			isToolBar: true,
			maxLevel: 2
		};
		$.extend(settings, defaults);

		var isLink = settings.isLink;
		var isToolBar = settings.isToolBar;
		var maxLevel = settings.maxLevel;
		var clickState = settings.clickState;		

		 var _Render = {
		 	LevelNodeRender : function( currData, parentNode, isLink, isToolBar, maxLevel, commandTool) {

				// 判断
				var len = currData.child && currData.child.length || 0;
				var level = parentNode.getLevel() + 1;
					// 无子元素个数返回
				if ( len ) {
					for( var i = 0; i < len; i++) {

						var data = currData.child[i];//获取集合中的单个元素
						var childLen = data.child && data.child.length || 0; // 子集的个数
						var last = (len == (i+1)); // 是否是最后一个元素
						var param = {
							data:data,
							level:level,
							maxLevel:(data.id==0 ? 1 : maxLevel),
							last:last,
							isLink:isLink,
							isToolBar:isToolBar,
							commandTool:commandTool
						}
						
						// 当前组元素是组合对象(Composite)还是单个对象(Leaf)
						if ( childLen ) {
							var treeComposite = new TreeComposite(param);
								parentNode.addNode(treeComposite);
								this.LevelNodeRender(data, treeComposite, isLink, isToolBar, maxLevel, commandTool); // 组合对象 递归调用它的子元素
						} else {
							var treeLeaf = new TreeLeaf(param);
							parentNode.addNode(treeLeaf);
						}
					}
				}

				parentNode.setLevel(level);
				return parentNode;
			},
			render : function() {

				maxLevel = maxLevel || 3;
				var  data = {
					id:-1,
					group_name:"全部",
					count:"0",
					group_pid:0
				}
				var that = this;
				var last = true;
				var param = {
					data:data,
					level:1,
					maxLevel:2,
					last:true,
					isLink:isLink,
					isToolBar:isToolBar,
					commandTool:commandTool
				}

				ajaxData.post({
					url:"/FavoriteGroup/jsonList",
					success: function( result ) {
						if ( result.state ) {
							param.data.count = result.total;
							result["child"] = result["child"] || result.data;
							var treeRoot = new TreeComposite(param);
							treeRoot.setLevel(1);
							var node = that.LevelNodeRender(result, treeRoot, isLink, isToolBar, maxLevel, commandTool);
							parent.html("").append(node.getElement());
						}
					}
				});

			}
		 }

		// receiver
		var treeCURD = new TreeCURD(that, _Render);
		// all Command
/*		var addCommand = ;
		var modifyCommand = new TreeCommand(treeCURD.modifyCommand);
		var updateCommand = new TreeCommand(treeCURD.updateCommand);
		var delCommand = new TreeCommand(treeCURD.delCommand);
		var cancelCommand = new TreeCommand(treeCURD.cancelCommand);
		var clickCommand = new TreeCommand(treeCURD.cancelCommand);
		var favoriteCommand = new TreeCommand(treeCURD.favoriteCommand);
		var moveCommand = new TreeCommand(treeCURD.moveCommand);*/

		// 控制面板
		var commandTool = {
			addCommand: new TreeCommand(treeCURD.addCommand),
			modifyCommand: new TreeCommand(treeCURD.modifyCommand),
			updateCommand: new TreeCommand(treeCURD.updateCommand),
			delCommand: new TreeCommand(treeCURD.delCommand),
			moveCommand: new TreeCommand(treeCURD.moveCommand),
			favoriteCommand: new TreeCommand(treeCURD.favoriteCommand),
			clickCommand: new TreeCommand(treeCURD.clickCommand),
			cancelCommand: new TreeCommand(treeCURD.cancelCommand)
		};

		if ( clickState == "move" ) {
			commandTool["clickCommand"] = commandTool["moveCommand"];
		}

		if ( clickState == "favorite" ) {
			commandTool["clickCommand"] = commandTool["favoriteCommand"];
		}

		_Render.render();

		return that;
	}
});


