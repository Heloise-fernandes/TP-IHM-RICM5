import javax.swing.event.ChangeListener;

import jdk.nashorn.internal.objects.annotations.Constructor;

public interface RangeSliderInterface {
	public int getMinimum();
    public int getMaximum();
    public int getFirstBound();
    public int getSecondBound();
    
    public int extentMax();
    public int extentSelected();
    
    public void setMinimum(int min);
    public void setMaximum(int max);
    public void setFirstBound(int first);
    public void setSecondBound(int second);
       
    public void addChangeListener(ChangeListener firstBoundListener, ChangeListener secondBoundListener);
    public void removechangeListener(ChangeListener x);

}
