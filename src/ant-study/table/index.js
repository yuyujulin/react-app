/**
 * Created by Administrator on 2016/11/6 0006.
 */
import React from 'react'

import './index.css'

var Table = React.createClass({
    render(){
        var that = this
        var columns = this.props.columns,
            data = this.props.dataSource;

        var arr = []

        var headerNodes = columns.map(function (headerColumn) {
            arr.push(headerColumn.dataIndex)

            return (
                <td key={headerColumn.key}>
                    {headerColumn.title}
                </td>
            )
        })

        var bodyNodes = data.map(function (dataRow, i) {
            var trs = arr.map(function (o, j) {
                return (
                    <td key={'td-' + dataRow[o] + '-' + j}>{dataRow[o]}</td>
                )
            })
            return (
                <tr onClick={e=>that.props.onRowClick(dataRow)} key={'tr-' + i}>
                    {trs}
                </tr>
            )
        })
        var page = null
        if (this.props.page){
            var pageNodes = (
                <p>
                    <a href="#">page-pre</a>,
                    <a href="#">page-1</a>,
                    <a href="#">page-2</a>,
                    <a href="#">page-3</a>,
                    <a href="#">page-next</a>
                </p>
            )
        }
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        {headerNodes}
                    </tr>
                    </thead>
                    <tbody>
                    {bodyNodes}
                    </tbody>
                </table>
                {pageNodes}
            </div>
        )
    },
    keyDown(e){
        if (e.key == 'Enter') {
            this.props.onPressEnter(e)
        }
    }
})

export  default Table