(function(){
    var tableHelper = function(){
      var template = 'div class="tableHelper"></div>',
        link = function(scope, element, attrs){
               var headerCols = [],
                   tableStart = '<table>',
                   tableEnd = '</table>',
                   table = '',
                   visibleProps = [],
                   sortCol = null,
                   sortDir = 1;
            
            scope.$watchCollection('datasource', render);
            wireEvents();
            
            funtion render(){
              if(scope.datasource && scope.datasource.length){
                  table += tableStart;
                  table += renderHeader();
                  table += renderRows() + tableEnd;
                  renderTable();
              }
            };
            
            function wireEvents(){
                element.on('click', function(event){
                   if(event.srcElement.nodeName === 'TH'){
                        var val = event.srcElement.innerHTML;
                        var col = scope.columnMap ? getRawColumnName(val) : val;
                       if(col) sort(col);
                   }
                });
            };
            
        }
      
      return {
          restrict: 'E',
          scope : {
            columnMap : '=',
            datasource : '='
          }
          link : link,
          template : template
      }
    };
    
    angular.module('directivesModule', [])
    .directive('tableHelper', tableHelper);
}());