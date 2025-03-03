<script lang="ts">


export let show:boolean = false;

</script>


<div class="overlay">
  <div class="alert">
    <p style="direction: rtl; text-align: right;">
      މަޤްސަދު: 
      
<br />

އެންމް ބަހެއް، 6 ފުރުސަތު. ގޮޅިތަކުގެ ފަހަތުގައި ވާ ތިން އަކުރުގެ ބަސް ދިމާކޮށްލައްވާ 

<br />
<br />

ކުޅޭގޮތް:
<br />

      ތިރީގައި ވާ ކީބޯޑުން އަކުރާއި ފިލި ޖެހުމަށްފަހު 'ޗެކް' ކޮށްލައަްވާ
<br />
      ގޮޅި ފުށުން ޖެހުމުން އިންނާނެ ތިން ކުލައެް
<br />
މި ކުލަތައް ބޭނުން ކޮށްގެން އަސްލު ބަސް ހޯދައި ގަނެވޭނެ
<br />
<span style="color: rgb(120, 124, 126);">■</span>
      އަޅި: މި ކުލަޖެއްސިފައިވާ ފިލި ނުވަތަ އަކުރު އަސްލު ބަހުގައި ނުވެސް ނެތީ
<br />

<span style="color: rgb(248, 132, 0);">■</span>
      އޮރެންޖު: މި ކުލަ ޖެއްސިފައިވާ ފިލި ނުވަތަ އަކުރު އަސްލު ލަފްޒުގައި އެބައިން  އެކަމަކު އެހެން ދިމާލެއްގައި
<br />

<span style="color: rgb(106, 170, 100);">■</span>
      ފެހި: އަކުރު ނުވަތަ ފިލި މުޅިން ދިމާވެފަ
     <br /> 

     ހުސް ނޫނު އަދި ތިކިޖެހި އަކުރު ނުހިމެނޭނެ

     <br /> 
މިވަގުތު ރަދީފުގައި ހިމެނެނީ ހ،ނ،އ އަދި ދ އިން ފެށޭ ބަސްތައް އެކަނި
     <br /> 
 ކޮންމެ ބުރެއްގައި އާ ރެންޑަމް ބަހެއް ނެގޭނެ
      

    </p>

    <button on:click={() => show = false}>ލައްޕާ</button>
  </div>
</div>


<style>

.alert {
  z-index: 50;
  font-size: 20px;
  position: absolute;
  margin-left: -60px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding-right: 1em;
  padding-left: 3em;
  z-index:1000;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 900;
}
</style>