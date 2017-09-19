import java.awt.Component;
import java.awt.Container;
import java.awt.Adjustable;
import java.awt.event.*;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Dimension;
import java.awt.Rectangle;
import java.awt.Point;
import java.awt.Insets;
import java.awt.Color;
import java.awt.IllegalComponentStateException;
import java.awt.Polygon;
import java.beans.*;
import java.util.Dictionary;
import java.util.Enumeration;

import javax.swing.border.AbstractBorder;

import javax.swing.*;
import javax.swing.event.*;
import javax.swing.plaf.*;
import javax.swing.plaf.basic.BasicGraphicsUtils;
import javax.swing.plaf.basic.BasicSliderUI;

import sun.swing.DefaultLookup;
import sun.swing.UIAction;


public class RangeSliderUI extends BasicSliderUI {

	protected Rectangle thumbRectNew = null; 
	
	// Colors
    private Color shadowColor;
    private Color highlightColor;
    private Color focusColor;
    
    //savoir sur quoi on drag
    private transient boolean isDraggingLeft;
    private transient boolean isDraggingRight;
    
    private boolean checkedLabelBaselines;
    private boolean sameLabelBaselines;
    private int lastValue;
    
	public RangeSliderUI(JSlider b) {
		super(b);
	}
	
	
	
	public void paintThumbRight(Graphics g)  
	{
        Rectangle rightBound = thumbRectNew;
        
        int wR = rightBound.width;
        int hR = rightBound.height;
        
        g.translate(rightBound.x, rightBound.y);
        
        //TODO verify slider
        if ( slider.isEnabled() ) {
            g.setColor(slider.getBackground());
        }
        else {
            g.setColor(slider.getBackground().darker());
        }

        Boolean paintThumbArrowShape = (Boolean) slider.getClientProperty("Slider.paintThumbArrowShape");

        if ((!slider.getPaintTicks() && paintThumbArrowShape == null) || paintThumbArrowShape == Boolean.FALSE) {

            // "plain" version
            g.fillRect(0, 0, wR, hR);

            g.setColor(Color.black);
            g.drawLine(0, hR-1, wR-1, hR-1);
            g.drawLine(wR-1, 0, wR-1, hR-1);

            g.setColor(highlightColor);
            g.drawLine(0, 0, 0, hR-2);
            g.drawLine(1, 0, wR-2, 0);

            g.setColor(shadowColor);
            g.drawLine(1, hR-2, wR-2, hR-2);
            g.drawLine(wR-2, 1, wR-2, hR-3);
            
        }
        else if ( slider.getOrientation() == JSlider.HORIZONTAL ) {
            int cw = wR / 2;
            g.fillRect(1, 1, wR-3, hR-1-cw);
            Polygon p = new Polygon();
            p.addPoint(1, hR-cw);
            p.addPoint(cw-1, hR-1);
            p.addPoint(wR-2, hR-1-cw);
            g.fillPolygon(p);

            g.setColor(highlightColor);
            g.drawLine(0, 0, wR-2, 0);
            g.drawLine(0, 1, 0, hR-1-cw);
            g.drawLine(0, hR-cw, cw-1, hR-1);

            g.setColor(Color.black);
            g.drawLine(wR-1, 0, wR-1, hR-2-cw);
            g.drawLine(wR-1, hR-1-cw, wR-1-cw, hR-1);

            g.setColor(shadowColor);
            g.drawLine(wR-2, 1, wR-2, hR-2-cw);
            g.drawLine(wR-2, hR-1-cw, wR-1-cw, hR-2);

            
        }/*
        else {  // vertical
            int cw = hR / 2;
            if(BasicGraphicsUtils.isLeftToRight(slider)) {
                  g.fillRect(1, 1, wR-1-cw, hR-3);
                  Polygon p = new Polygon();
                  p.addPoint(wR-cw-1, 0);
                  p.addPoint(wR-1, cw);
                  p.addPoint(wR-1-cw, hR-2);
                  g.fillPolygon(p);

                  g.setColor(super.getHighlightColor());
                  g.drawLine(0, 0, 0, hR - 2);                  // left
                  g.drawLine(1, 0, wR-1-cw, 0);                 // top
                  g.drawLine(wR-cw-1, 0, wR-1, cw);              // top slant

                  g.setColor(Color.black);
                  g.drawLine(0, hR-1, wR-2-cw, hR-1);             // bottom
                  g.drawLine(wR-1-cw, hR-1, wR-1, hR-1-cw);        // bottom slant

                  g.setColor(super.getShadowColor());
                  g.drawLine(1, hR-2, wR-2-cw,  hR-2 );         // bottom
                  g.drawLine(wR-1-cw, hR-2, wR-2, hR-cw-1 );     // bottom slant
            }
            else {
                  g.fillRect(5, 1, wR-1-cw, hR-3);
                  Polygon p = new Polygon();
                  p.addPoint(cw, 0);
                  p.addPoint(0, cw);
                  p.addPoint(cw, hR-2);
                  g.fillPolygon(p);

                  g.setColor(super.getHighlightColor());
                  g.drawLine(cw-1, 0, wR-2, 0);             // top
                  g.drawLine(0, cw, cw, 0);                // top slant

                  g.setColor(Color.black);
                  g.drawLine(0, hR-1-cw, cw, hR-1 );         // bottom slant
                  g.drawLine(cw, hR-1, wR-1, hR-1);           // bottom

                  g.setColor(super.getShadowColor());
                  g.drawLine(cw, hR-2, wR-2,  hR-2 );         // bottom
                  g.drawLine(wR-1, 1, wR-1,  hR-2 );          // right
            }
        }*/

        g.translate(-rightBound.x, -rightBound.y);
    }
	
	public static ComponentUI createUI(JComponent b)    {
        return new BasicSliderUI((JSlider)b);
    }

    public void installUI(JComponent c)   {
        thumbRectNew = new Rectangle();
        super.installUI(c);
    }
    
    public void uninstallUI(JComponent c) {
    	thumbRectNew = null;
        super.uninstallUI(c);
    }
    
    public void paint( Graphics g, JComponent c )   {
        super.paint(g, c);
        if ( g.getClipBounds().intersects( thumbRectNew ) ) {
        	paintThumbRight( g );
        }
    }
    
    
    protected void calculateThumbRightLocation() {
        if ( slider.getSnapToTicks() ) {
            int sliderValue = slider.getValue();
            int snappedValue = sliderValue;
            int majorTickSpacing = slider.getMajorTickSpacing();
            int minorTickSpacing = slider.getMinorTickSpacing();
            int tickSpacing = 0;

            if ( minorTickSpacing > 0 ) {
                tickSpacing = minorTickSpacing;
            }
            else if ( majorTickSpacing > 0 ) {
                tickSpacing = majorTickSpacing;
            }

            if ( tickSpacing != 0 ) {
                // If it's not on a tick, change the value
                if ( (sliderValue - slider.getMinimum()) % tickSpacing != 0 ) {
                    float temp = (float)(sliderValue - slider.getMinimum()) / (float)tickSpacing;
                    int whichTick = Math.round( temp );

                    // This is the fix for the bug #6401380
                    if (temp - (int)temp == .5 && sliderValue < lastValue) {
                      whichTick --;
                    }
                    snappedValue = slider.getMinimum() + (whichTick * tickSpacing);
                }

                if( snappedValue != sliderValue ) {
                    slider.setValue( snappedValue );
                }
            }
        }

        if ( slider.getOrientation() == JSlider.HORIZONTAL ) {
            int valuePosition = xPositionForValue(slider.getValue());

            thumbRectNew.x = valuePosition - (thumbRectNew.width / 2);
            thumbRectNew.y = trackRect.y;
        }
        else {
            int valuePosition = yPositionForValue(slider.getValue());

            thumbRectNew.x = trackRect.x;
            thumbRectNew.y = valuePosition - (thumbRectNew.height / 2);
        }
    }
    
    
    
    
}
