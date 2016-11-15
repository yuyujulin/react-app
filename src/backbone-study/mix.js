/**
 * Created by Administrator on 2016/11/12 0012.
 */
import model from './model'

export default {
    componentDidMount:function () {
        console.log("i am in mixins")
    },
    setSingleDataFlow(modelName,stateName){
        console.log(modelName)
        console.log(stateName)
        var that = this
        model[modelName].on('reset add remove change', function(){
            var obj = {}
            obj[stateName] = model[modelName].toJSON()
            that.setState(obj)
        })
    }
}
