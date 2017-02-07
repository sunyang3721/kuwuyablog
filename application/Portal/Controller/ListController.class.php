<?php
// +----------------------------------------------------------------------
// | ThinkCMF [ WE CAN DO IT MORE SIMPLE ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013-2014 http://www.thinkcmf.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: Dean <zxxjjforever@163.com>
// +----------------------------------------------------------------------
namespace Portal\Controller;
use Common\Controller\HomebaseController;

class ListController extends HomebaseController {

	// 前台文章列表
	public function index() {
	    $term_id=I('get.id',0,'intval');
		$term=sp_get_term($term_id);
		if(empty($term)){
		    header('HTTP/1.1 404 Not Found');
		    header('Status:404 Not Found');
		    if(sp_template_file_exists(MODULE_NAME."/404")){
		        $this->display(":404");
		    }
		    return;
		}

		if($term['parent'] == 0){
			$where['parent'] = $term_id;
			$terms = sp_get_terms('field:term_id',$where);
			foreach ($terms as $key => $value) {
				$terms_id[] = $value['term_id'];
			}
			$cat_id = implode(',',$terms_id);
			$this->assign('cat_id', $cat_id);

			//针对移动端响应式  分类id对应子分类显示
			$this->child_term = sp_get_child_terms($term_id);
		}else{
			$this->assign($term);
			$this->assign('cat_id', $term_id);
		}
		$tplname=$term["list_tpl"];
    	$tplname=sp_get_apphome_tpl($tplname, "list");
    	$this->display(":$tplname");
	}
	
	// 文章分类列表接口,返回文章分类列表,用于后台导航编辑添加
	public function nav_index(){
		$navcatname="文章分类";
        $term_obj= M("Terms");

        $where=array();
        $where['status'] = array('eq',1);
        $terms=$term_obj->field('term_id,name,parent')->where($where)->order('term_id')->select();
		$datas=$terms;
		$navrule = array(
		    "id"=>'term_id',
            "action" => "Portal/List/index",
            "param" => array(
                "id" => "term_id"
            ),
            "label" => "name",
		    "parentid"=>'parent'
        );
		return sp_get_nav4admin($navcatname,$datas,$navrule) ;
	}
}
