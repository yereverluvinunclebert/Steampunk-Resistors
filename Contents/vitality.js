/*
COPYRIGHT (c) 2006 YAHOO! INC.

The following BSD License applies solely to the programming code
included in this file. 

(1)	Redistributions of source code must retain the above copyright
notice, this list of conditions, and the following disclaimer.
(2)	Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
(3) 	Neither the name of Yahoo! nor the names of its contributors may
be used to endorse or promote products derived from the Yahoo! Widgets
without specific prior written permission of Yahoo!.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER
OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*properties
    appendChild, createDocument, createElement, dockOpen, setAttribute,
    setDockItem
*/

function buildVitality(value, color1, color2, color3, color4) {
	var doc, v, resistor, swatch1, swatch2, swatch3, swatch4, txt;
	
	if (!widget.dockOpen) { return; }

	// create an XML document
	doc = XMLDOM.createDocument();
	v = doc.createElement("dock-item");
	v.setAttribute("version", "1.0");
	doc.appendChild(v);
	
	resistor = doc.createElement("image");
	resistor.setAttribute("src", "Resources/Pictures/resistor.png");
	resistor.setAttribute("hOffset", 0);
	resistor.setAttribute("vOffset", 20);
	v.appendChild(resistor);

	swatch1 = doc.createElement("image");
	swatch1.setAttribute("src", "Resources/Pictures/swatch.png");
	swatch1.setAttribute("hOffset", 13);
	swatch1.setAttribute("vOffset", 27);
	swatch1.setAttribute("colorize", color1);
	v.appendChild(swatch1);
		
	swatch2 = doc.createElement("image");
	swatch2.setAttribute("src", "Resources/Pictures/swatch.png");
	swatch2.setAttribute("hOffset", 25);
	swatch2.setAttribute("vOffset", 27);
	swatch2.setAttribute("colorize", color2);
	v.appendChild(swatch2);

	swatch3 = doc.createElement("image");
	swatch3.setAttribute("src", "Resources/Pictures/swatch.png");
	swatch3.setAttribute("hOffset", 37);
	swatch3.setAttribute("vOffset", 27);
	swatch3.setAttribute("colorize", color3);
	v.appendChild(swatch3);

	if (color4 !== undefined) {
		swatch4 = doc.createElement("image");
		swatch4.setAttribute("src", "Resources/Pictures/swatch.png");
		swatch4.setAttribute("hOffset", 49);
		swatch4.setAttribute("vOffset", 27);
		swatch4.setAttribute("colorize", color4);
		v.appendChild(swatch4);
	}

	txt = doc.createElement("text");
	txt.setAttribute("hOffset", "37");
	txt.setAttribute("vOffset", "63");
	txt.setAttribute("hAlign", "center");
	txt.setAttribute("style", "font-family: Arial;font-size: 14px; font-weight: bold; color: white;");
	txt.setAttribute("data",  value);
	v.appendChild(txt);
	
	widget.setDockItem(doc, "fade");					
}
