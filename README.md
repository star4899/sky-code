# sky-code

블로그[(blog.skydown.co.kr)](https://blog.skydown.co.kr) 에서 사용하고 있는 Code Syntax Highlighter 2.0.0 입니다.

***

## 사용방법

## 빌드

```js
// init install
$npm i

// webpack dev server
$npm run dev

// build
$npm run build
```

***

### 구조

*HTML*

```html
<div class="code-box">
	<pre data-language="js">
		<code>
			<p>function(){</p>
			<p style="padding-left:20px;">let arry = [1,2,3,4,5];</p>
			<p style="padding-left:20px;">arrt.forEach((item, index, arr) => {</p>
			<p style="padding-left:40px;">console.log(item)</p>
			<p style="padding-left:20px;">})</p>
			<p>}</p>
		</code>
	</pre>
</div>

<script src="skycode.js"><script>
```

*JS*

```js
var syntxHighlighter = new skyCode(".code-box", {
	classPrefix : "skycode"
});
```

***

### 설정

```html``` *language*

* ```selectTag``` > ```pre``` > ```code``` > ```p``` 순의 ```html``` 이 구성이 필요합니다.
* ```pre``` 태그의 ```data-language``` 속성으로 언어를 설정 할 수 있습니다.
* ```html```, ```css```, ```js``` 설정이 가능합니다. (v1.0)
* 설정하지 않을 경우 ```js``` 로 기본 설정 됩니다.

```js``` *selector*

* ```DOM querySelectorAll``` 의 선택자를 설정 합니다.

```js``` *option*

* ```classPrefix```
	* ```style``` 적용을 위한 ```class``` 의 접두사를 설정 할 수 있습니다.
	* 기본 접두사는 ```skycode``` 로 설정 되어 있습니다.
