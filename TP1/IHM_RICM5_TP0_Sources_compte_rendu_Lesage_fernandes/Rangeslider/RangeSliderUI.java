package Rangeslider;
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

//============================================================================================//
//le code provient de la classe BasicSliderUI et a été modifié pour s'adapter au RangeSlider
//============================================================================================//

public class RangeSliderUI extends BasicSliderUI {

	protected Rectangle thumbRectNew = null; 
	
	// Colors
    private Color shadowColor;
    private Color highlightColor;
    private Color focusColor;
    
    
    private transient boolean isDraggingLeft;
    private transient boolean isDraggingRight;
    
    private boolean checkedLabelBaselines;
    private boolean sameLabelBaselines;
    private int lastValue;
    
	public RangeSliderUI(JSlider b) {
		super(b);
	}
	
	@Override
	public void paintThumb(Graphics g){}
	
	public void paintThumbRight(Graphics g)  
	{
		
        Rectangle rightBound = thumbRectNew;
        
        int wR = rightBound.width;
        int hR = rightBound.height;
        
        g.translate(rightBound.x, rightBound.y);
        
        if ( slider.isEnabled() ) {
            g.setColor(slider.getBackground());
        }
        else {
            g.setColor(slider.getBackground().darker());
        }

        Boolean paintThumbArrowShape = (Boolean) slider.getClientProperty("Slider.paintThumbArrowShape");

        if ((!slider.getPaintTicks() && paintThumbArrowShape == null) || paintThumbArrowShape == Boolean.FALSE) {

            g.fillRect(0, 0, wR, hR);

            g.setColor(Color.black);
            g.drawLine(0, hR-1, wR-1, hR-1);//right
            g.drawLine(wR-1, 0, wR-1, hR-1);//bottom

            g.setColor(highlightColor);
            g.drawLine(0, 0, 0, hR-2); //left
            g.drawLine(1, 0, wR-2, 0); //top

            g.setColor(shadowColor);
            g.drawLine(1, hR-2, wR-2, hR-2);//bottom
            g.drawLine(wR-2, 1, wR-2, hR-3);//right
            
        }
        g.translate(-rightBound.x, -rightBound.y);
            
        
    }
	
	public void paintThumbLeft(Graphics g)  
	{
		
        Rectangle leftBound = thumbRect;
        
        int wR = leftBound.width;
        int hR = leftBound.height;
        
        g.translate(leftBound.x, leftBound.y);

        if ( slider.isEnabled() ) {
            g.setColor(slider.getBackground());
        }
        else {
            g.setColor(slider.getBackground().darker());
        }

        Boolean paintThumbArrowShape = (Boolean) slider.getClientProperty("Slider.paintThumbArrowShape");

        if ((!slider.getPaintTicks() && paintThumbArrowShape == null) || paintThumbArrowShape == Boolean.FALSE) {

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
        g.translate(-leftBound.x, -leftBound.y);
    }
	
	public static ComponentUI createUI(JComponent b) {
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
        paintThumbLeft(g);
        paintThumbRight(g);
       
    }

    
    @Override
    protected void calculateThumbLocation() {
    	super.calculateThumbLocation();
    	
        if ( slider.getSnapToTicks() ) {
            int rightValue = ((RangeSlider) slider).getSecondBound();
            int snappedValue = rightValue;
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
                if ( (rightValue - slider.getMinimum()) % tickSpacing != 0 ) {
                    float temp = (float)(rightValue - slider.getMinimum()) / (float)tickSpacing;
                    int whichTick = Math.round( temp );

                    // This is the fix for the bug #6401380
                    if (temp - (int)temp == .5 && rightValue < lastValue) {
                      whichTick --;
                    }
                    snappedValue = slider.getMinimum() + (whichTick * tickSpacing);
                }

                if( snappedValue != rightValue ) {
                    slider.setExtent( snappedValue - slider.getMinimum() );
                }
            }
        }

        if ( slider.getOrientation() == JSlider.HORIZONTAL ) {
            int rightPosition = xPositionForValue(((RangeSlider) slider).getSecondBound());

            thumbRectNew.x = rightPosition - (thumbRectNew.width / 2);
            thumbRectNew.y = trackRect.y;
        }
        else {
            int rightPosition = yPositionForValue(slider.getValue());

            thumbRectNew.x = trackRect.x;
            thumbRectNew.y = rightPosition - (thumbRectNew.height / 2);
        }
    }
    
    protected void calculateThumbSize()
    {
    	super.calculateThumbSize();
    	thumbRectNew.setSize(thumbRect.width, thumbRect.height);
    }
    
    @Override
    public void paintTrack(Graphics g)  {
    	super.paintTrack(g);
    }
    
    public void setRightThumbLocation(int x, int y)  {
        Rectangle rightUnion = new Rectangle(); 
        rightUnion.setBounds( thumbRectNew );

        thumbRectNew.setLocation( x, y );

        SwingUtilities.computeUnion( thumbRectNew.x, thumbRectNew.y, thumbRectNew.width, thumbRectNew.height, rightUnion );
        slider.repaint( rightUnion.x, rightUnion.y, rightUnion.width, rightUnion.height );
    }
    

    @Override
    protected TrackListener createTrackListener(JSlider slider) {
        return new RangeTrackListener();
    }

    @Override
    protected ChangeListener createChangeListener(JSlider slider) {
        return new ChangeThumbListener();
    }
    
    public class ChangeThumbListener implements ChangeListener {
        public void stateChanged(ChangeEvent arg0) {
            if (!isDraggingLeft && !isDraggingRight) {
                calculateThumbLocation();
                slider.repaint();
            }
        }
    }
    
    public class RangeTrackListener extends TrackListener {
        
    	@Override
        public void mouseReleased(MouseEvent e) {
    		isDraggingLeft = false;
    		isDraggingRight	 = false;
            slider.setValueIsAdjusting(false);
            super.mouseReleased(e);
        }
    	
    	@Override
        public void mousePressed(MouseEvent e) {
            if (!slider.isEnabled()) {
                return;
            }

            currentMouseX = e.getX();
            currentMouseY = e.getY();

            if (slider.isRequestFocusEnabled()) {
                slider.requestFocus();
            }
            
            
            boolean leftPressed = false;
            boolean rightPressed = false;
            if (thumbRectNew.contains(currentMouseX, currentMouseY)) {
                   rightPressed = true;
            } else if (thumbRect.contains(currentMouseX, currentMouseY)) {
                  leftPressed = true;
            }

            if (leftPressed) {
                switch (slider.getOrientation()) {
                case JSlider.VERTICAL:
                    offset = currentMouseY - thumbRect.y;
                    break;
                case JSlider.HORIZONTAL:
                    offset = currentMouseX - thumbRect.x;
                    break;
                }
                isDraggingLeft = true;
                return;
            }
            isDraggingLeft = false;
            
            
            if (rightPressed) {
                switch (slider.getOrientation()) {
                case JSlider.VERTICAL:
                    offset = currentMouseY - thumbRectNew.y;
                    break;
                case JSlider.HORIZONTAL:
                    offset = currentMouseX - thumbRectNew.x;
                    break;
                }
                isDraggingRight = true;
                return;
            }
            isDraggingRight = false;
        }
    	
    	@Override
        public void mouseDragged(MouseEvent e) {
            if (!slider.isEnabled()) {
                return;
            }

            currentMouseX = e.getX();
            currentMouseY = e.getY();

            if (isDraggingLeft) {
                slider.setValueIsAdjusting(true);
                mouseDraggedLeftThumb();
                
            } else if (isDraggingRight) {
                slider.setValueIsAdjusting(true);
                mouseDraggedRightThumb();
            }
        }
    	
    	private void mouseDraggedLeftThumb() {
            int thumbMiddle = 0;
           
            int halfThumbWidth = thumbRect.width / 2;
            int thumbLeft = currentMouseX - offset;
            int trackLeft = trackRect.x;
            int trackRight = trackRect.x + (trackRect.width - 1);
            int hMax = xPositionForValue(((RangeSlider) slider).getSecondBound());
            
            if (drawInverted()) {
                trackLeft = hMax;
            } else {
                trackRight = hMax;
            }
            thumbLeft = Math.max(thumbLeft, trackLeft - halfThumbWidth);
            thumbLeft = Math.min(thumbLeft, trackRight - halfThumbWidth);

            
            
            setThumbLocation(thumbLeft, thumbRect.y);

            thumbMiddle = thumbLeft + halfThumbWidth;
            
            ((RangeSlider) slider).setFirstBound(valueForXPosition(thumbMiddle));
            
        }


        private void mouseDraggedRightThumb() {
            int thumbMiddle = 0;
            
            int halfThumbWidth = thumbRect.width / 2;
            int thumbLeft = currentMouseX - offset;
            int trackLeft = trackRect.x;
            int trackRight = trackRect.x + (trackRect.width - 1);
            int hMin = xPositionForValue(((RangeSlider) slider).getFirstBound());

            if (drawInverted()) {
                trackRight = hMin;
            } else {
                trackLeft = hMin;
            }
            thumbLeft = Math.max(thumbLeft, trackLeft - halfThumbWidth);
            thumbLeft = Math.min(thumbLeft, trackRight - halfThumbWidth);

            setRightThumbLocation(thumbLeft, thumbRect.y);
            
            thumbMiddle = thumbLeft + halfThumbWidth;
            ((RangeSlider) slider).setSecondBound(valueForXPosition(thumbMiddle));
        }
    	
    	@Override
        public boolean shouldScroll(int direction) {
            return false;
        }
    }
    
    
    
}
