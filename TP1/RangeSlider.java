import javax.swing.JSlider;
import javax.swing.event.ChangeListener;

public class RangeSlider extends JSlider implements RangeSliderInterface
{

	private int minimum;
	private int maximum;
	private int firstBound;
	private int secondBound;
	
	
	@Override
	public int getMinimum() {
		return minimum;
	}

	@Override
	public int getMaximum() {
		return maximum;
	}

	@Override
	public int getFirstBound() {
		return firstBound;
	}

	@Override
	public int getSecondBound() {
		return secondBound;
	}

	@Override
	public int extentMax() {
		return this.maximum - this.minimum;
	}

	@Override
	public int extentSelected() {
		return this.secondBound - this.secondBound;
	}

	
	public RangeSlider(int min, int max, int firstBound, int secondBound) {
		// TODO Auto-generated method stub
	}

	
	public RangeSlider(int min, int max) {
		// TODO Auto-generated method stub
	}

	@Override
	public void addChangeListener(ChangeListener firstBoundListener, ChangeListener secondBoundListener) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removechangeListener(ChangeListener x) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setMinimum(int min) {
		this.minimum = min;
		//TODO
	}

	@Override
	public void setMaximum(int max) {
		this.maximum = max;
		//TODO
	}

	@Override
	public void setFirstBound(int first) {
		this.firstBound = first;
		//TODO
		
	}

	@Override
	public void setSecondBound(int second) {
		this.secondBound = second;
		//TODO
		
	}
	
	public void updateUI() {
		setUI(new RangeSliderUI(this));
		updateLabelUIs();
	}

}
