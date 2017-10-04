package Rangeslider;
import javax.swing.event.ChangeListener;

import jdk.nashorn.internal.objects.annotations.Constructor;

public interface RangeSliderInterface {
	
    public int getFirstBound();
    public int getSecondBound();
    public void setFirstBound(int first);
    public void setSecondBound(int second);
    public void updateUI();
}
