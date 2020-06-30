// Main module declaration
angular.module('myApp', []);

// Create service used to retrieve the imperial data
angular.module('myApp').service('imperialService', function($http) {
    this.getImperialData = function() {
        var http = $http.get('../imperialData.json')
        return http;
    }
});

// Controller for the Phenotype tables
function PhenotypeController($scope, $element, $attrs, imperialService) {
    var ctrl = this;
    ctrl.types = []

    // Retrieve Data from the service
    imperialService.getImperialData().then(function(response) {
        console.log("Success!")
        ctrl.types = response.data;
    });

    // function to remove item from table
    ctrl.removePhenotype = function(pheno) {
        var ind = ctrl.types.indexOf(pheno); // Get index of item
        ctrl.types.splice(ind, 1); // Remove from list
    }

}
// Component for the main table
angular.module('myApp').component('phenoTable', {
    templateUrl: "./templates/phenoTable.html", // !Note!, due to some odd issues with the way templates work in angular, we ran into an issue where table rows in the entry template 
                                                //    wouldn't show up in the table in the phenoTable templates, so we had to do an ugly workaround which will be fixed by the next feature
    controller: PhenotypeController
});

function PhenoEntryController() {
    var ctrl = this;
    //Remove function which sends the item up to the table component
    ctrl.remove = function() {
        ctrl.onRemove({pheno: ctrl.pheno});
    }
}
// Component for the table entries themselves
angular.module('myApp').component('phenoEntry', {
    templateUrl: "./templates/phenoEntry.html",
    controller: PhenoEntryController,
    bindings: {
        pheno: '<', // One way binding for the input of the phenotype field
        onRemove: '&' // Output binding for onRemove getting sent up the component tree
    }
})


/*
  $scope.phenoData = [
  {
    "姓名": "孟卿",
    "身份": "儒生",
    "地區1": "東海",
    "地區2": "蘭陵",
    "地區3": "",
    "Highest Positions": ""
  },
  {
    "姓名": "孟喜",
    "身份": "儒生",
    "地區1": "東海",
    "地區2": "蘭陵",
    "地區3": "",
    "Highest Positions": "丞相掾"
  },
  {
    "姓名": "白光",
    "身份": "儒生",
    "地區1": "東海",
    "地區2": "蘭陵",
    "地區3": "",
    "Highest Positions": "博士"
  },
  {
    "姓名": "后倉",
    "身份": "儒生",
    "地區1": "東海",
    "地區2": "蘭陵",
    "地區3": "",
    "Highest Positions": "少府"
  },
  {
    "姓名": "疏廣",
    "身份": "儒生",
    "地區1": "東海",
    "地區2": "蘭陵",
    "地區3": "",
    "Highest Positions": "太傅"
  },
  {
    "姓名": "疏受",
    "身份": "儒生",
    "地區1": "東海",
    "地區2": "蘭陵",
    "地區3": "",
    "Highest Positions": "少傅"
  },
  {
    "姓名": "蕭望之",
    "身份": "儒生",
    "地區1": "東海",
    "地區2": "蘭陵",
    "地區3": "杜陵",
    "Highest Positions": "御史大夫"
  },
  {
    "姓名": "蕭育",
    "身份": "",
    "地區1": "",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "大鴻臚"
  },
  {
    "姓名": "蕭咸",
    "身份": "",
    "地區1": "",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "大司農"
  },
  {
    "姓名": "蕭由",
    "身份": "",
    "地區1": "",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "安定太守"
  },
  {
    "姓名": "翼奉",
    "身份": "儒生",
    "地區1": "東海",
    "地區2": "下阫",
    "地區3": "",
    "Highest Positions": "博士"
  },
  {
    "姓名": "嚴延年",
    "身份": "儒生",
    "地區1": "東海",
    "地區2": "下阫",
    "地區3": "",
    "Highest Positions": "太守"
  },
  {
    "姓名": "嚴彭祖",
    "身份": "儒生",
    "地區1": "東海",
    "地區2": "下阫",
    "地區3": "",
    "Highest Positions": "左馮翊"
  },
  {
    "姓名": "匡衡",
    "身份": "儒生",
    "地區1": "東海",
    "地區2": "承人",
    "地區3": "",
    "Highest Positions": "丞相"
  },
  {
    "姓名": "匡咸",
    "身份": "儒生",
    "地區1": "",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "左馮翊"
  },
  {
    "姓名": "師丹",
    "身份": "儒生",
    "地區1": "琅邪",
    "地區2": "東武",
    "地區3": "",
    "Highest Positions": "大司空"
  },
  {
    "姓名": "于定國",
    "身份": "",
    "地區1": "東海",
    "地區2": "郯",
    "地區3": "",
    "Highest Positions": "御史大夫"
  },
  {
    "姓名": "于永",
    "身份": "",
    "地區1": "",
    "地區2": "",
    "地區3": "",
    "Highest Positions": ""
  },
  {
    "姓名": "張敞",
    "身份": "",
    "地區1": "河東",
    "地區2": "平陽",
    "地區3": "杜陵",
    "Highest Positions": "京兆尹"
  },
  {
    "姓名": "張武",
    "身份": "",
    "地區1": "",
    "地區2": "",
    "地區3": "杜陵",
    "Highest Positions": ""
  },
  {
    "姓名": "張竦",
    "身份": "",
    "地區1": "",
    "地區2": "",
    "地區3": "杜陵",
    "Highest Positions": ""
  },
  {
    "姓名": "周堪",
    "身份": "儒生",
    "地區1": "齊人",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "光祿勳"
  },
  {
    "姓名": "牟卿",
    "身份": "儒生",
    "地區1": "",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "博士"
  },
  {
    "姓名": "許商",
    "身份": "儒生",
    "地區1": "長安",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "光祿勳"
  },
  {
    "姓名": "通漢",
    "身份": "儒生",
    "地區1": "沛",
    "地區2": "聞人",
    "地區3": "",
    "Highest Positions": "中山中尉"
  },
  {
    "姓名": "慶普",
    "身份": "儒生",
    "地區1": "沛",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "東平太傅"
  },
  {
    "姓名": "翟牧",
    "身份": "儒生",
    "地區1": "沛",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "博士"
  },
  {
    "姓名": "戴德",
    "身份": "儒生",
    "地區1": "梁",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "信都太傅"
  },
  {
    "姓名": "戴聖",
    "身份": "儒生",
    "地區1": "梁",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "九江太守"
  },
  {
    "姓名": "眭弘？",
    "身份": "儒生",
    "地區1": "魯國",
    "地區2": "蕃人",
    "地區3": "",
    "Highest Positions": "符節令"
  },
  {
    "姓名": "王吉",
    "身份": "儒生",
    "地區1": "琅玡",
    "地區2": "皋虞",
    "地區3": "少時學問，居長安",
    "Highest Positions": "博士"
  },
  {
    "姓名": "王駿",
    "身份": "",
    "地區1": "",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "御史大夫"
  },
  {
    "姓名": "王崇",
    "身份": "",
    "地區1": "",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "大司空"
  },
  {
    "姓名": "貢禹",
    "身份": "儒生",
    "地區1": "琅邪",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "御史大夫"
  },
  {
    "姓名": "石顯",
    "身份": "",
    "地區1": "濟南",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "中書令"
  },
  {
    "姓名": "夏侯始昌",
    "身份": "儒生",
    "地區1": "魯人",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "昌邑王太傅"
  },
  {
    "姓名": "夏侯勝",
    "身份": "儒生",
    "地區1": "東平人",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "太子太傅"
  },
  {
    "姓名": "孔霸",
    "身份": "儒生",
    "地區1": "",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "高密相"
  },
  {
    "姓名": "孔光",
    "身份": "儒生",
    "地區1": "",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "丞相"
  },
  {
    "姓名": "夏侯建",
    "身份": "儒生",
    "地區1": "",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "太子少傅"
  },
  {
    "姓名": "丙吉",
    "身份": "",
    "地區1": "魯國",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "丞相"
  },
  {
    "姓名": "丙顯",
    "身份": "",
    "地區1": "",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "太僕"
  },
  {
    "姓名": "魏相",
    "身份": "儒生",
    "地區1": "濟陰",
    "地區2": "定陶",
    "地區3": "平陵",
    "Highest Positions": "御史大夫"
  },
  {
    "姓名": "韓延壽",
    "身份": "",
    "地區1": "燕人",
    "地區2": "",
    "地區3": "杜陵",
    "Highest Positions": "左馮翊"
  },
  {
    "姓名": "史高",
    "身份": "外戚",
    "地區1": "",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "大司馬"
  },
  {
    "姓名": "薛廣德",
    "身份": "儒生",
    "地區1": "沛郡",
    "地區2": "相",
    "地區3": "",
    "Highest Positions": "御史大夫"
  },
  {
    "姓名": "王式",
    "身份": "儒生",
    "地區1": "東平",
    "地區2": "新桃",
    "地區3": "",
    "Highest Positions": "昌邑王師"
  },
  {
    "姓名": "田王孫",
    "身份": "儒生",
    "地區1": "碭",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "博士"
  },
  {
    "姓名": "梁丘賀",
    "身份": "儒生",
    "地區1": "琅邪",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "少府"
  },
  {
    "姓名": "梁丘臨",
    "身份": "儒生",
    "地區1": "",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "少府"
  },
  {
    "姓名": "施讎",
    "身份": "儒生",
    "地區1": "沛",
    "地區2": "",
    "地區3": "",
    "Highest Positions": "博士"
  },
  {
    "姓名": "馬宮",
    "身份": "儒生",
    "地區1": "東海",
    "地區2": "戚",
    "地區3": "",
    "Highest Positions": "大司徒"
  },
  {
    "姓名": "王仲翁",
    "身份": "儒生",
    "地區1": "",
    "地區2": "",
    "地區3": "",
    "Highest Positions": ""
  }
]
*/