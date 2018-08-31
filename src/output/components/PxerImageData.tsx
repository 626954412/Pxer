import React, { Component, ChangeEvent } from 'react';
import { PxerWorkType } from '../../pxer/pxerapp/PxerData.-1';
import { PxerWorkUrl } from '../../pxer/pxerapp/PxerWorksDef.-1';
import { PxerIndeterminatableBoxState, PxerSelectableWorks } from '../lib';
interface IPxerSortableTHProps {
    sortFunc: (key: keyof PxerSelectableWorks)=>void,
    sortKey: keyof PxerSelectableWorks,
    currentKey: string|null,
    innerContent: string|JSX.Element,
    reverse: boolean,
}
class PxerSortableTH extends Component<IPxerSortableTHProps> {
    constructor(props: IPxerSortableTHProps){
        super(props);
    }
    render(){
        return (
            <th
                onClick={
                    e=>{
                        if (e.target!==e.currentTarget) return;
                        this.props.sortFunc(this.props.sortKey)
                    }
                }
                className={
                    this.props.currentKey===this.props.sortKey?"sorting oneline":"oneline"
                }
            >
            {this.props.innerContent}
            {this.props.currentKey===this.props.sortKey?(this.props.reverse?"↓":"↑"):null}
            </th>
        )
    }
}

interface IPxerImageDataHeadProps {
    boxState: PxerIndeterminatableBoxState,
    onSort: (key: keyof PxerSelectableWorks, reverse: boolean)=>void,
    onSetAllSelectedState: (newstate: boolean)=>void,
}
interface IPxerImageDataHeadState {
    sortKey: keyof PxerSelectableWorks|null,
    sortReverse: boolean,
    selectAll: boolean,
    inDeterminate: boolean,
}
class PxerImageDataHead extends Component<IPxerImageDataHeadProps,IPxerImageDataHeadState> {
    constructor(props: IPxerImageDataHeadProps){
        super(props);
        this.state = {
            sortKey: null,
            sortReverse: true,
            selectAll: true,
            inDeterminate: false,
        }
        this.doSort = this.doSort.bind(this);
        this.handleCheckedState = this.handleCheckedState.bind(this);
    }
    static getDerivedStateFromProps(props: IPxerImageDataHeadProps, state: IPxerImageDataHeadState) {
        switch (props.boxState) {
        case PxerIndeterminatableBoxState.all:
            return {
                selectAll: true,
                inDeterminate: false,
            }
        case PxerIndeterminatableBoxState.indeterminate:
            return {
                selectAll: false,
                inDeterminate: true,
            }
        case PxerIndeterminatableBoxState.none:
            return{
                selectAll: false,
                inDeterminate: false,
            }
        }
    }
    componentDidUpdate(){
        (this.refs.selall as HTMLInputElement).indeterminate = this.state.inDeterminate;
    }
    render(){
        return (
            <tr>
                <PxerSortableTH
                    sortKey="checked"
                    sortFunc={this.doSort}
                    currentKey={this.state.sortKey}
                    reverse={this.state.sortReverse}
                    innerContent={<input type="checkbox" checked={this.state.selectAll} onChange={this.handleCheckedState} ref="selall"></input>}
                />
                <PxerSortableTH
                    sortKey="id"
                    sortFunc={this.doSort}
                    currentKey={this.state.sortKey}
                    reverse={this.state.sortReverse}
                    innerContent="illustID"
                />
                <PxerSortableTH
                    sortKey="type"
                    sortFunc={this.doSort}
                    currentKey={this.state.sortKey}
                    reverse={this.state.sortReverse}
                    innerContent="Type"
                />
                <th>Thumb</th>
                <th>Tags</th>
                <PxerSortableTH
                    sortKey="multiple"
                    sortFunc={this.doSort}
                    currentKey={this.state.sortKey}
                    reverse={this.state.sortReverse}
                    innerContent="PageCount"
                />
                <PxerSortableTH
                    sortKey="likeCount"
                    sortFunc={this.doSort}
                    currentKey={this.state.sortKey}
                    reverse={this.state.sortReverse}
                    innerContent="LikeCount"
                />
                <PxerSortableTH
                    sortKey="viewCount"
                    sortFunc={this.doSort}
                    currentKey={this.state.sortKey}
                    reverse={this.state.sortReverse}
                    innerContent="ViewCount"
                />
                <PxerSortableTH
                    sortKey="ratedCount"
                    sortFunc={this.doSort}
                    currentKey={this.state.sortKey}
                    reverse={this.state.sortReverse}
                    innerContent="RateCount"
                />
                <th>WorkTitle</th>
                <PxerSortableTH
                    sortKey="date"
                    sortFunc={this.doSort}
                    currentKey={this.state.sortKey}
                    reverse={this.state.sortReverse}
                    innerContent="Date"
                />
            </tr>
        )
    }
    doSort(key: keyof PxerSelectableWorks){
        var reverse = this.state.sortKey===key?!this.state.sortReverse:true;
        this.props.onSort(key, reverse)
        this.setState(prev=>{
            return {
                sortKey: key,
                sortReverse: reverse,
            }
        })
    }
    handleCheckedState(){
        this.setState(prev=>{
            this.props.onSetAllSelectedState(!prev.selectAll);
            return {selectAll: !prev.selectAll}
        })
    }
}

interface IPxerImageDataLineProps {
    work: PxerSelectableWorks,
    tagFoldLength: number,
    onChange: ()=>void,
}
interface IPxerImageDataLineState {}
class PxerImageDataLine extends Component<IPxerImageDataLineProps,IPxerImageDataLineState> {
    constructor(props: IPxerImageDataLineProps){
        super(props);
        this.state = {}
        this.handleCheckedState = this.handleCheckedState.bind(this);
        this.toggleCheckedState = this.toggleCheckedState.bind(this);
    }
    render(){
        return (
            <tr className={this.props.work.checked?"checked":""} onClick={this.toggleCheckedState}>
                <td><input type="checkbox" checked={this.props.work.checked} onChange={this.handleCheckedState}></input></td>
                <td>{this.props.work.id}</td>
                <td>{this.props.work.type}</td>
                <td>
                    <img src={this.props.work.urls.thumb} className="table-img"></img>
                </td>
                <td 
                    data-tooltip={this.props.work.tagList.join(" ")}
                >
                    {
                        this.props.work.tagList.slice(0, this.props.tagFoldLength).map(tag=><p key={this.props.work.id+"_"+tag}>{tag}</p>)
                    }
                    {
                        this.props.work.tagList.length>this.props.tagFoldLength?<i className="shy">{this.props.work.tagList.length-this.props.tagFoldLength} not shown. Mouseover for more information.</i>:null
                    }
                </td>
                <td>{this.props.work.multiple}</td>
                <td>{this.props.work.likeCount}</td>
                <td>{this.props.work.viewCount}</td>
                <td>{this.props.work.ratedCount}</td>
                <td>{this.props.work.title}</td>
                <td className="oneline">{this.props.work.date}</td>
            </tr>
        )
    }
    handleCheckedState(e: ChangeEvent<HTMLInputElement>){
        var nowstate = (e.target).checked;
        this.props.work.checked = nowstate;
        this.props.onChange();
        this.forceUpdate();
    }
    toggleCheckedState(){
        this.props.work.checked = !this.props.work.checked;
        this.props.onChange();
        this.forceUpdate();
    }
}

export {PxerImageDataHead, PxerImageDataLine, IPxerImageDataLineState}